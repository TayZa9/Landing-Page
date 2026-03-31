"use client";

import { motion } from "framer-motion";

const TECHNOLOGIES = [
  {
    id: "tech-vision",
    icon: "visibility",
    title: "Computer Vision",
    description:
      "YOLOv26n inference for hazard detection, FaceNet for identity recognition, and relative coordinate estimation.",
  },
  {
    id: "tech-language",
    icon: "forum",
    title: "Natural Language",
    description:
      "Multimodal reasoning converting complex scenes into step-by-step navigation cues via optimized TTS.",
  },
  {
    id: "tech-memory",
    icon: "memory",
    title: "Intelligent Memory",
    description:
      "ChromaDB integration enabling semantic retrieval of historical visual events.",
  },
  {
    id: "tech-generative",
    icon: "psychology",
    title: "Generative AI",
    description:
      "Gemini core interpreting visual intent, automatically filtering noise to prevent cognitive overload.",
  },
];

export function TechnologiesSection() {
  return (
    <section id="technology" className="relative z-10 bg-[#050505] px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300 shadow-[0_0_22px_rgba(79,70,229,0.35)]">
            HACKATHON 2026 // CORE TECH
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-100 md:text-5xl">
            Agentic Vision Technologies
          </h2>
          <p className="mt-3 bg-[var(--accent-gradient)] bg-clip-text text-lg font-medium tracking-[0.08em] text-transparent md:text-xl">
            Detect. Interpret. Enhance.
          </p>
        </motion.div>

        <div className="tech-grid gap-6">
          {TECHNOLOGIES.map((tech, index) => (
            <motion.article
              key={tech.title}
              id={tech.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card scroll-mt-28 rounded-2xl p-6 md:p-7"
            >
              <div className="mb-5 inline-flex rounded-2xl border border-[var(--border-subtle)] p-[1px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(79,70,229,0.38),rgba(30,41,59,0.88))] text-slate-100 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  <span className="material-symbols-outlined text-[24px] leading-none">{tech.icon}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-100">{tech.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{tech.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
