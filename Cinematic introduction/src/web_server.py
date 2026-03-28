import logging
import threading
import os
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
# from slowapi import _rate_limit_exceeded_handler
# from slowapi.errors import RateLimitExceeded
# from src.security import limiter

import config
from src.database import init_db
from src.auth import auth_router

# Configure logging
logging.basicConfig(filename='system.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

init_db()

app = FastAPI(title="SmartAV API")
app.add_middleware(
    SessionMiddleware, 
    secret_key=config.SECRET_KEY
)


# Mount static files
app.mount("/static", StaticFiles(directory="src/static"), name="static")

# Import all routers
import src.api.views as views
import src.api.settings as settings
import src.api.feeds as feeds
import src.api.status as status
import src.api.timeline as timeline
import src.api.dashboard as dashboard
import src.api.navigation as navigation
import src.api.faces as faces
import src.api.system as system

# Include all routers
app.include_router(auth_router)
app.include_router(views.router)
app.include_router(settings.router)
app.include_router(feeds.router)
app.include_router(status.router)
app.include_router(timeline.router)
app.include_router(dashboard.router)
app.include_router(navigation.router)
app.include_router(faces.router)
app.include_router(faces.user_router)
app.include_router(system.router)

import src.engine as engine

# Start detection in background
@app.on_event("startup")
async def startup_event():
    threading.Thread(target=engine.detection_loop, daemon=True).start()

@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down...")
    engine.stop_detection_process()
    if engine.camera: engine.camera.stop()
    if engine.audio: engine.audio.stop()

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("src/static/images/Logo.png")

@app.get("/")
async def root(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login")
    return RedirectResponse(url="/dashboard")
