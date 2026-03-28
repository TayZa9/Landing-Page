"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AliceChatDemo from "./AliceChatDemo";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";

export function MeetAlice() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const coreOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[52vh] items-center justify-center overflow-hidden bg-[#050505] px-6 py-20 md:min-h-[60vh]"
      data-scan-reactive
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-[radial-gradient(circle,_rgba(54,209,255,0.1)_0%,_transparent_70%)]"
        style={{ opacity: coreOpacity }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <ScrollRevealWords
          text="Meet Alice."
          className="text-5xl font-light leading-[1.08] tracking-tight text-white md:text-7xl"
        />
        <ScrollRevealWords
          text="Your digital set of eyes that doesn’t just see, but understands."
          className="mt-5 max-w-3xl text-base font-light leading-relaxed text-white/70 md:text-2xl"
        />
        <div className="mt-12 w-full">
          <AliceChatDemo />
        </div>
      </div>
    </section>
  );
}
