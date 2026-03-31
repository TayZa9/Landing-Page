"use client";

import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import LightPillar from "@/components/ui/LightPillar";

const outfitBlack = Outfit({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export default function HeroSplit() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 text-white md:px-20">
      <LightPillar
        className="pointer-events-none absolute inset-0 opacity-80"
        topColor="#00c7fc"
        bottomColor="#008cb4"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        mixBlendMode="screen"
        pillarRotation={25}
        interactive={false}
        quality="high"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,23,42,0)_22%,rgba(2,6,23,0.72)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full space-y-7 text-center md:space-y-10">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className={`${outfitBlack.className} bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-[4.15rem] font-black leading-[0.88] tracking-[-0.04em] text-transparent md:text-[8rem] lg:text-[9rem]`}
            >
              Spatial Intelligence. Instant Action.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8 }}
              className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-xl"
            >
              AuraVision converts real-world scenes into live, decision-ready context in under 50 milliseconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 pt-1 sm:flex-row"
            >
              <a
                href="http://localhost:8080"
                className="group relative inline-flex items-center rounded-full border border-indigo-300/35 bg-slate-900/50 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 shadow-[0_0_18px_rgba(99,102,241,0.2)] transition hover:border-indigo-200/55 hover:bg-slate-800/65 hover:shadow-[0_0_30px_rgba(99,102,241,0.38)]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-indigo-400/15 blur-md animate-[pulse_4s_ease-in-out_infinite] group-hover:animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="relative z-10">Launch Live Demo</span>
              </a>

              <a
                href="/technology"
                className="group inline-flex items-center text-sm font-medium tracking-wide text-slate-400 transition hover:text-slate-200"
              >
                <span className="relative">
                  Explore Core Stack
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-slate-300 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="h-48" aria-hidden />
      </div>
    </section>
  );
}
