"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCENES = [
  "/hero-src/scene1.png",
  "/hero-src/scene2.png",
  "/hero-src/scene3.png",
  "/hero-src/scene4.png",
  "/hero-src/scene5.png",
];

export function VisionShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SCENES.length);
  };

  return (
    <section className="relative z-10 bg-[#050505] pb-12 pt-6 md:pb-16">
      <div className="relative overflow-hidden bg-black">
        <div className="relative aspect-video w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={SCENES[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={SCENES[currentIndex]}
                alt={`Vision scene ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-3 lg:px-4">
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous scene"
          className="pointer-events-auto p-3 text-[#36d1ff] opacity-55 transition-opacity duration-200 hover:opacity-100"
        >
          <ChevronLeft className="h-12 w-12" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next scene"
          className="pointer-events-auto p-3 text-[#36d1ff] opacity-55 transition-opacity duration-200 hover:opacity-100"
        >
          <ChevronRight className="h-12 w-12" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}
