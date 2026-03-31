"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: "bolt",
    iconClass: "text-cyan-200",
    title: "Real-Time Edge Perception",
    body: "High-velocity YOLOv26n inference processes environmental hazards locally in under 50ms, without requiring cloud dependency.",
  },
  {
    icon: "memory",
    iconClass: "text-violet-200",
    title: "Semantic Spatial Memory",
    body: "Every meaningful detection is vectorized into ChromaDB. Ask Alice where you left your keys, and she retrieves the timestamped location.",
  },
  {
    icon: "record_voice_over",
    iconClass: "text-amber-200",
    title: "Natural Agentic Voice",
    body: "Receive hands-free, intelligent audio guidance that filters out noise and prioritizes critical spatial information when you need it.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContextGapSection() {
  return (
    <section className="relative z-10 bg-[#050505] px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="animate-in fade-in slide-in-from-bottom-3 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">THE CONTEXT GAP</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Vision Without Understanding is Just Noise.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <motion.article
            variants={fadeUp}
            className="glass-card animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 md:p-5"
          >
            <div className="relative h-[260px] overflow-hidden rounded-xl border border-[var(--border-subtle)] md:h-[340px]">
              <Image src="/image src/noisy_vision_analogy.png" alt="Raw vision scene" fill className="object-cover saturate-75" />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(220,38,38,0.35),rgba(239,68,68,0.14),transparent_65%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(248,113,113,0.28),transparent_38%)]" />
            </div>
            <p className="mt-4 text-sm font-semibold tracking-wide text-slate-100">
              Status Quo: White Cane + Generic Camera
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Mute, static, and cannot identify specific hazards.
            </p>
          </motion.article>

          <motion.article
            variants={fadeUp}
            className="glass-card animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 md:p-5"
          >
            <div className="relative h-[260px] overflow-hidden rounded-xl border border-[var(--border-subtle)] md:h-[340px]">
              <Image src="/image src/clean_vision_analogy.png" alt="Agentic vision enhanced scene" fill className="object-cover" />
              <div className="absolute left-[12%] top-[18%] h-20 w-28 rounded-md border-2 border-cyan-300/85 shadow-[0_0_22px_rgba(34,211,238,0.45)] md:h-20 md:w-32" />
              <div className="absolute right-[15%] top-[36%] h-16 w-24 rounded-md border-2 border-fuchsia-300/85 shadow-[0_0_20px_rgba(232,121,249,0.38)] md:h-20 md:w-28" />
              <div className="absolute left-[34%] bottom-[18%] h-14 w-24 rounded-md border-2 border-cyan-200/85 shadow-[0_0_18px_rgba(125,211,252,0.35)] md:h-16 md:w-24" />

              <div className="absolute bottom-4 left-4 max-w-[85%] rounded-2xl border border-cyan-300/35 bg-slate-950/85 px-4 py-3 text-sm text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.24)]">
                Alice: Caution. Fast-moving cyclist approaching on your right.
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold tracking-wide text-slate-100">AuraVision Pipeline</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Contextual, spatial awareness translated instantly into audio cues.
            </p>
          </motion.article>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-16 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <motion.article
                key={pillar.title}
                variants={fadeUp}
                className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-glow)] hover:shadow-[0_0_28px_rgba(99,102,241,0.2)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-slate-900/75">
                  <span className={`material-symbols-outlined text-[23px] ${pillar.iconClass}`}>{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-100">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
