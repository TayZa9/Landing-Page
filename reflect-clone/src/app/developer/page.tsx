"use client";

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AuraNavbar } from "@/components/layout/AuraNavbar";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "TayZar",
    role: "Lead AI Engineer",
    bio: "Architected the Edge-Perception pipeline and optimized the YOLOv26n models for sub-50ms latency. Passionate about computer vision and real-time inference.",
    image: "/team/tayzar.png",
  },
  {
    name: "Jom",
    role: "Systems Architect",
    bio: "Designed the Multimodal RAG memory system using ChromaDB. Bridged the gap between raw hardware feeds and the Gemini reasoning engine.",
    image: "/team/jom.png",
  },
  {
    name: "Kellen",
    role: "UI/UX & Frontend Lead",
    bio: "Crafted the cinematic glassmorphism interface and WebSockets dashboard. Focused on translating complex spatial data into intuitive, human-centric design.",
    image: "/team/kellen.png",
  },
  {
    name: "Melo",
    role: "Backend & Cloud Engineer",
    bio: "Built the FastAPI infrastructure and Firebase security policies. Ensured the local-first architecture remained secure while handling heavy multimodal data streams.",
    image: "/team/melo.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function DeveloperPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04050c] text-white">
      <AuraNavbar />

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 18%, rgba(56,189,248,0.16), transparent 36%), radial-gradient(circle at 84% 26%, rgba(99,102,241,0.22), transparent 38%), linear-gradient(118deg, rgba(15,23,42,0.68), rgba(2,6,23,0.94))",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-72 w-[min(90vw,760px)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent-glow)" }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="animate-in fade-in slide-in-from-bottom-3 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">THE TEAM</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Built by Visionaries.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-xl">
            Meet the 4-person engineering team behind the AuraVision intelligence platform.
          </p>
          <div className="mx-auto mt-6 h-1 w-44 rounded-full" style={{ backgroundImage: "var(--accent-gradient)" }} />
        </motion.header>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.article
              key={member.name}
              variants={cardVariants}
              className="glass-card animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--border-glow)] md:p-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-slate-900/85 shadow-[0_0_24px_rgba(99,102,241,0.35)]">
                  <Image src={member.image} alt={`${member.name} portrait`} fill className="object-cover" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 rounded-2xl border border-cyan-300/30"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-100">{member.name}</h2>
                  <span className="mt-2 inline-flex rounded-full border border-[var(--border-subtle)] bg-slate-900/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-200">
                    {member.role}
                  </span>
                </div>
              </div>

              <p className="min-h-[96px] text-sm leading-relaxed text-slate-400">{member.bio}</p>

              <div className="mt-5 flex items-center gap-2">
                <a
                  href="#"
                  aria-label={`${member.name} GitHub`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-slate-900/70 text-slate-300 transition hover:border-cyan-300/45 hover:text-cyan-200 hover:shadow-[0_0_16px_rgba(34,211,238,0.24)]"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label={`${member.name} LinkedIn`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-slate-900/70 text-slate-300 transition hover:border-cyan-300/45 hover:text-cyan-200 hover:shadow-[0_0_16px_rgba(34,211,238,0.24)]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </section>
    </main>
  );
}
