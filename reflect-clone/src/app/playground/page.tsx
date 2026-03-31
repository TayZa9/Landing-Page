"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AuraNavbar } from "@/components/layout/AuraNavbar";

type Scenario = {
  id: string;
  title: string;
  image: string;
  detections: string;
  audio: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "busy-intersection",
    title: "Busy Intersection",
    image: "/hero-src/scene2.jpg",
    detections: "[Car: Far Left], [Person: Near Right]",
    audio: "Caution: Person approaching on your right in 2 meters.",
  },
  {
    id: "living-room",
    title: "Living Room",
    image: "/hero-src/scene1.jpg",
    detections: "[Table: Center], [Sofa: Left], [Lamp: Near Right]",
    audio: "Path is clear. Coffee table is directly ahead in 1 meter.",
  },
  {
    id: "warehouse-shelf",
    title: "Warehouse Shelf",
    image: "/hero-src/scene4.jpg",
    detections: "[Forklift: Mid Left], [Box Stack: Center], [Worker: Near Right]",
    audio: "Warning: Worker moving across your right side. Slow down.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export default function PlaygroundPage() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [processing, setProcessing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceLabel, setSourceLabel] = useState("Busy Intersection");

  const result = useMemo(() => activeScenario, [activeScenario]);

  useEffect(() => {
    setProcessing(true);
    const timer = setTimeout(() => setProcessing(false), 1400);
    return () => clearTimeout(timer);
  }, [activeScenario]);

  const handleQuickTry = (scenario: Scenario) => {
    setSourceLabel(scenario.title);
    setActiveScenario(scenario);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSourceLabel(`Uploaded: ${file.name}`);
    setActiveScenario({
      id: "uploaded-image",
      title: file.name,
      image: SCENARIOS[0].image,
      detections: "[Car: Far Left], [Person: Near Right]",
      audio: "Caution: Person approaching on your right in 2 meters.",
    });
  };

  const handlePlayAudio = () => {
    if (processing || !result) return;
    setIsPlaying(true);
    window.setTimeout(() => setIsPlaying(false), 1800);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04050c] text-white">
      <AuraNavbar />

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 18%, rgba(56,189,248,0.17), transparent 36%), radial-gradient(circle at 84% 28%, rgba(99,102,241,0.2), transparent 38%), linear-gradient(115deg, rgba(15,23,42,0.65), rgba(2,6,23,0.9))",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-34 md:px-12 lg:px-16">
        <Reveal>
          <header className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 md:p-9">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Interactive Demo</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">AuraVision Playground</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
              Upload an image or select a scenario to see how Alice interprets the world.
            </p>
          </header>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <section className="animate-in fade-in slide-in-from-bottom-3 space-y-5">
              <label
                htmlFor="playground-upload"
                onDragEnter={() => setIsDragActive(true)}
                onDragLeave={() => setIsDragActive(false)}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragActive(true);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragActive(false);
                }}
                className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-[var(--bg-card)] p-6 text-center transition ${
                  isDragActive
                    ? "border-[var(--border-glow)] shadow-[0_0_30px_rgba(99,102,241,0.35)]"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-glow)]"
                }`}
              >
                <span className="material-symbols-outlined text-4xl text-cyan-200">upload_file</span>
                <p className="mt-3 text-lg font-medium text-white">Drag and drop an image</p>
                <p className="mt-1 text-sm text-slate-400">or click to upload from your device</p>
                <input id="playground-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SCENARIOS.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleQuickTry(scenario)}
                    className={`overflow-hidden rounded-xl border bg-[var(--bg-card)] text-left transition ${
                      activeScenario.id === scenario.id
                        ? "border-cyan-300/60 shadow-[0_0_22px_rgba(56,189,248,0.25)]"
                        : "border-[var(--border-subtle)] hover:border-cyan-300/40"
                    }`}
                  >
                    <div className="relative h-20 w-full">
                      <Image src={scenario.image} alt={scenario.title} fill className="object-cover" />
                    </div>
                    <p className="px-3 py-2 text-sm font-medium text-slate-200">{scenario.title}</p>
                  </button>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="glass-card animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-0.5">
              <div className="rounded-[15px] border border-[var(--border-subtle)] bg-[#05070f] p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <p className="text-sm font-semibold text-white">Alice Output Console</p>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{sourceLabel}</span>
                </div>

                {processing ? (
                  <div className="flex min-h-[210px] flex-col items-center justify-center gap-4">
                    <div className="relative h-10 w-10">
                      <span className="absolute inset-0 rounded-full border-2 border-cyan-300/30" />
                      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-200 animate-spin" />
                    </div>
                    <p className="text-sm text-slate-300">Processing visual context...</p>
                  </div>
                ) : (
                  <div className="space-y-5 text-slate-300">
                    <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-900/75 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Visual Detections</p>
                      <p className="mt-2 text-sm text-cyan-100">{result.detections}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--border-subtle)] bg-slate-900/75 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Alice Audio Output</p>
                      <p className="mt-2 text-sm text-slate-200">{result.audio}</p>
                    </div>
                    <button
                      onClick={handlePlayAudio}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isPlaying ? "animate-pulse" : ""}`}>
                        volume_up
                      </span>
                      {isPlaying ? "Playing..." : "Play Audio"}
                    </button>
                  </div>
                )}
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
