"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuraNavbar } from "@/components/layout/AuraNavbar";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
    >
      {children}
    </motion.div>
  );
}

function TerminalVisual() {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[0_0_45px_rgba(79,70,229,0.2)]">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-black/35 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Detection Stream</span>
      </div>

      <div className="space-y-3 font-mono text-[12px] text-slate-300">
        <p className="text-cyan-300">frame: 2026-03-29T20:17:04.211Z</p>
        <p>{"{"}</p>
        <p className="pl-4 text-slate-400">{'"model": "YOLOv26n",'}</p>
        <p className="pl-4">{'"hazards": [{"class": "stair_edge", "conf": 0.97, "pos": "Left"}],'}</p>
        <p className="pl-4">{'"identity": {"pipeline": "FaceNet", "match": "Aung", "conf": 0.91},'}</p>
        <p className="pl-4 text-indigo-300">{'"spatial": ["Left", "Center", "Right"]'}</p>
        <p>{"}"}</p>
      </div>

      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl" />
    </div>
  );
}

function DatabaseVisual() {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
      <div className="relative h-[260px] rounded-xl border border-[var(--border-subtle)] bg-slate-950/70">
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }} />

        <div className="absolute left-8 top-8 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
        <div className="absolute left-1/2 top-1/3 h-4 w-4 rounded-full bg-violet-300 shadow-[0_0_16px_rgba(196,181,253,0.9)]" />
        <div className="absolute bottom-10 right-10 h-4 w-4 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />

        <div className="absolute left-[2.25rem] top-[2.5rem] h-px w-[45%] rotate-12 bg-gradient-to-r from-cyan-300/80 to-transparent" />
        <div className="absolute left-1/2 top-[36%] h-px w-[35%] -rotate-12 bg-gradient-to-r from-violet-300/80 to-transparent" />

        <div className="absolute bottom-4 left-4 rounded-lg border border-[var(--border-subtle)] bg-slate-900/90 px-3 py-2 text-xs text-slate-300">
          Vector DB: ChromaDB
          <p className="mt-1 text-[11px] text-slate-400">timestamp + embedding + spatial index</p>
        </div>
      </div>
    </div>
  );
}

function ReasoningVisual() {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
      <div className="rounded-xl border border-[var(--border-subtle)] bg-black/35 p-4">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-400">Reasoning Channel</p>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 py-2">
            Input: 14 detections, 2 moving hazards, 1 familiar face.
          </div>
          <div className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-indigo-200">
            Step 1: Filter low-priority objects.
          </div>
          <div className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-indigo-200">
            Step 2: Prioritize left-side stair-edge alert.
          </div>
          <div className="rounded-lg border border-emerald-400/35 bg-emerald-500/10 px-3 py-2 text-emerald-200">
            Audio Output: Caution. Stair edge on your left in 1.5 meters.
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -left-14 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
    </div>
  );
}

const FLOATING_TECH_LOGOS = [
  { src: "/tech-logos/python.png", alt: "Python logo", top: "8%", side: "left", offset: "-5.7rem", size: 108, drift: 16, duration: 16, delay: 0 },
  { src: "/tech-logos/javascript.png", alt: "JavaScript logo", top: "14%", side: "right", offset: "-6.2rem", size: 126, drift: 18, duration: 19, delay: 0.8 },
  { src: "/tech-logos/html5.jpeg", alt: "HTML5 logo", top: "24%", side: "left", offset: "-5.2rem", size: 112, drift: 12, duration: 17, delay: 1.2 },
  { src: "/tech-logos/css3.png", alt: "CSS3 logo", top: "32%", side: "right", offset: "-5.6rem", size: 104, drift: 14, duration: 18, delay: 0.4 },
  { src: "/tech-logos/pytorch.jpeg", alt: "PyTorch logo", top: "42%", side: "left", offset: "-5rem", size: 96, drift: 12, duration: 15, delay: 1.4 },
  { src: "/tech-logos/opencv.png", alt: "OpenCV logo", top: "50%", side: "right", offset: "-5.4rem", size: 116, drift: 18, duration: 20, delay: 0.2 },
  { src: "/tech-logos/fastapi.png", alt: "FastAPI logo", top: "59%", side: "left", offset: "-4.8rem", size: 92, drift: 10, duration: 14, delay: 0.9 },
  { src: "/tech-logos/firebase.png", alt: "Firebase logo", top: "67%", side: "right", offset: "-5.3rem", size: 106, drift: 16, duration: 18, delay: 1.1 },
  { src: "/tech-logos/google-cloud.png", alt: "Google Cloud logo", top: "76%", side: "left", offset: "-5.5rem", size: 118, drift: 14, duration: 19, delay: 0.6 },
  { src: "/tech-logos/google-gemini.jpeg", alt: "Google Gemini logo", top: "84%", side: "right", offset: "-5.1rem", size: 112, drift: 15, duration: 17, delay: 1.6 },
  { src: "/tech-logos/tailwind.png", alt: "Tailwind CSS logo", top: "91%", side: "left", offset: "-4.9rem", size: 102, drift: 12, duration: 16, delay: 0.3 },
] as const;

function FloatingTechBalloons() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-full max-w-7xl -translate-x-1/2 overflow-visible xl:block"
      aria-hidden="true"
    >
      {FLOATING_TECH_LOGOS.map((logo) => (
        <motion.div
          key={logo.alt}
          className="absolute flex items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.3),rgba(255,255,255,0.08)_58%,rgba(4,8,14,0.35)_100%)] shadow-[0_10px_32px_rgba(2,8,23,0.42),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-md"
          style={{
            top: logo.top,
            ...(logo.side === "left" ? { left: logo.offset } : { right: logo.offset }),
            width: logo.size,
            height: logo.size,
          }}
          animate={{
            x: [0, logo.drift, -logo.drift * 0.55, 0],
            y: [0, -16, 10, 0],
            rotate: [0, 1.8, -1.1, 0],
          }}
          transition={{
            duration: logo.duration,
            delay: logo.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={72}
            height={72}
            className="h-[56%] w-[56%] object-contain opacity-90 saturate-[0.9]"
          />
        </motion.div>
      ))}
    </div>
  );
}

function PrivacyFlowVisual() {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-4 py-2">
        <span className="material-symbols-outlined text-emerald-200">shield_lock</span>
        <span className="text-xs uppercase tracking-[0.18em] text-emerald-100">Private Data Path</span>
      </div>

      <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-900/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Step 1</p>
          <p className="mt-1 font-medium text-white">Local Edge Node</p>
        </div>
        <div className="hidden text-center text-cyan-300 md:block">→</div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-900/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Step 2</p>
          <p className="mt-1 font-medium text-white">Metadata Only</p>
        </div>
        <div className="hidden text-center text-cyan-300 md:block">→</div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-900/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Step 3</p>
          <p className="mt-1 font-medium text-white">Cloud LLM</p>
        </div>
      </div>
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04050c] text-white">
      <AuraNavbar />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 18%, rgba(99,102,241,0.22), transparent 38%), radial-gradient(circle at 78% 22%, rgba(56,189,248,0.16), transparent 36%), linear-gradient(115deg, rgba(15,23,42,0.65), rgba(2,6,23,0.9))",
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "linear-gradient(rgba(71,85,105,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(71,85,105,0.14) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }} />
      </div>
      <FloatingTechBalloons />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-36 md:px-12 lg:px-16">
        <SectionReveal>
          <span className="inline-flex w-fit items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            CORE ARCHITECTURE
          </span>
        </SectionReveal>

        <SectionReveal>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            The Intelligence Behind AuraVision.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-xl">
            Discover how we fuse edge-based perception with generalized AI reasoning to deliver real-time spatial awareness.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:border-cyan-300/60 hover:shadow-[0_0_22px_rgba(34,211,238,0.32)]"
            >
              Download Whitepaper
            </a>
            <Link
              href="https://github.com"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold tracking-wide text-cyan-200 transition hover:bg-cyan-500/20"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </Link>
          </div>
        </SectionReveal>
      </section>

      <section id="edge-computer-vision" className="relative z-10 scroll-mt-28 px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <SectionReveal>
            <TerminalVisual />
          </SectionReveal>

          <SectionReveal>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-cyan-200">Edge Computer Vision</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">YOLO &amp; FaceNet at the Edge</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              AuraVision runs a multi-model perception stack where YOLOv26n performs ultra-low-latency hazard detection, while a parallel FaceNet pipeline preserves social continuity through familiar identity recognition.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Raw pixels are transformed into directional intent through relative spatial coordinates, mapping every high-confidence event into Left, Center, or Right lanes so the user receives intuitive, immediately actionable guidance.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section id="multimodal-rag" className="relative z-10 scroll-mt-28 px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <SectionReveal>
            <div className="order-2 lg:order-1">
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-indigo-200">Multimodal RAG</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Temporal Spatial Persistence</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                AuraVision is not stateless. Every detection stream is embedded, timestamped, and persisted in ChromaDB to build a temporal memory of the environment.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                This enables retrieval-driven responses to practical questions like Where did I put my keys? by aligning semantic queries with historical localized visual events.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="order-1 lg:order-2">
              <DatabaseVisual />
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="agentic-reasoning" className="relative z-10 scroll-mt-28 px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <SectionReveal>
            <ReasoningVisual />
          </SectionReveal>

          <SectionReveal>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-violet-200">Agentic Reasoning</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Context Over Pixels</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              Bounding boxes are only primitives. The Gemini core orchestrates perception, memory retrieval, and intent to decide which details matter in the current moment.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              By filtering low-value noise and escalating only critical context through the audio channel, AuraVision protects attention and prevents cognitive overload during motion.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section id="metrics" className="relative z-10 mb-20 mt-12 border-y border-[var(--border-subtle)] bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))]">
        <SectionReveal>
          <div className="mx-auto grid max-w-7xl animate-in fade-in slide-in-from-bottom-3 grid-cols-1 gap-6 px-6 py-8 md:grid-cols-3 md:px-12 lg:px-16">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
              <p className="text-3xl font-semibold text-cyan-200">&lt; 50ms</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">Inference Latency</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
              <p className="text-3xl font-semibold text-cyan-200">99.8%</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">Spatial Accuracy</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
              <p className="text-3xl font-semibold text-cyan-200">Local + Edge</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">Processing Architecture</p>
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <SectionReveal>
            <div className="animate-in fade-in slide-in-from-bottom-3">
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-emerald-200">DATA SECURITY</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Privacy by Design. Local by Default.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                AuraVision processes all raw video feeds locally on the edge device. No video is ever uploaded to the cloud.
                Only lightweight, anonymized metadata in JSON form is forwarded to the LLM core for reasoning.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                This architecture preserves absolute user privacy while minimizing bandwidth usage, enabling robust assistive
                intelligence even in constrained network conditions.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="animate-in fade-in slide-in-from-bottom-3">
              <PrivacyFlowVisual />
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-10 px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <h3 className="animate-in fade-in slide-in-from-bottom-3 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Technology Constellation
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-slate-300">
              Each core framework now appears as a floating balloon across this page, creating a clean and immersive systems view.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 pt-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <div className="glass-card animate-in fade-in slide-in-from-bottom-3 relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.18),transparent_36%),radial-gradient(circle_at_86%_70%,rgba(129,140,248,0.22),transparent_42%),linear-gradient(130deg,rgba(15,23,42,0.94),rgba(2,6,23,0.9))] p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
              <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Build with AuraVision Spatial Data
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                Hook into our real-time WebSockets and build your own assistive or industrial applications on top of our
                perception engine.
              </p>
              <Link
                href="/developer"
                className="mt-7 inline-flex items-center rounded-full border border-cyan-300/50 bg-cyan-500/15 px-6 py-3 text-sm font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-500/25 hover:shadow-[0_0_26px_rgba(34,211,238,0.36)]"
              >
                View Developer Docs
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
