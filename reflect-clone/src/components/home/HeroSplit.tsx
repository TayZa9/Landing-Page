"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";

export default function HeroSplit() {
  return (
    <section className="relative min-h-screen bg-transparent text-white px-6 md:px-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Stars
            radius={90}
            depth={60}
            count={5000}
            factor={3.5}
            saturation={0.3}
            fade
            speed={0.4}
          />
        </Canvas>
      </div>

      <div className="relative z-10 min-h-screen mx-auto w-full max-w-6xl flex items-center justify-center">
        <div className="w-full text-center space-y-8 md:space-y-10">
          <ScrollRevealWords
            text="Think in Aura"
            className="text-5xl md:text-8xl font-light tracking-tighter text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto max-w-3xl text-lg md:text-2xl text-white/50 leading-relaxed font-light"
          >
            Aura V is the ultimate cognitive co-pilot for driven minds. It provides a dynamic,
            3D-accelerated workspace that organizes your thoughts, accelerates your workflow, and
            empowers your creativity.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
