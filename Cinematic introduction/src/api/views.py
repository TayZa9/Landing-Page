from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
import config

router = APIRouter()
templates = Jinja2Templates(directory="src/templates")

@router.get("/")
async def index(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request, "google_maps_api_key": config.GOOGLE_MAPS_API_KEY})

@router.get("/timeline")
async def timeline_page(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request, "google_maps_api_key": config.GOOGLE_MAPS_API_KEY})

@router.get("/analytic")
async def analytic_page(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/settings")
async def settings_page(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request, "google_maps_api_key": config.GOOGLE_MAPS_API_KEY})

@router.get("/identity")
async def identity_page(request: Request):
    if not request.session.get('user_id'):
        return RedirectResponse(url="/login", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/intro")
async def intro_page(request: Request):
    return templates.TemplateResponse("intro_video.html", {"request": request})
