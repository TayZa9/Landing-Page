"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Image from "next/image";
import * as THREE from "three";

// ─── Mouse tracker (shared across inner components) ──────────────────────────
const mouse = new THREE.Vector2();
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

// ─── Parallax Points Field ─────────────────────────────────────────────────────
function ParallaxPoints() {
  const pointsRef = useRef<THREE.Group>(null!);
  const count = 900;
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + seededRandom(i * 3 + 1) * 6;
      const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const parallaxStrength = 0.8;
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mouse.x * parallaxStrength,
      0.06
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mouse.y * parallaxStrength,
      0.06
    );
    pointsRef.current.rotation.y += 0.0008;
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#8ae8ff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

// ─── Scene lighting + environment ────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Key: cyan from upper-right */}
      <pointLight position={[5, 5, 4]} intensity={80} color="#36d1ff" />
      {/* Fill: warm white from lower-left */}
      <pointLight position={[-5, -3, -3]} intensity={30} color="#ffffff" />
      <spotLight
        position={[0, 8, 6]}
        angle={0.45}
        penumbra={1}
        intensity={180}
        color="#8be9ff"
        castShadow
      />
    </>
  );
}

// ─── Hero entrance animation wrapper ─────────────────────────────────────────
function FadeUp({
  delay,
  children,
  className,
  style,
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.85, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function HeroBackdrop() {
  const frames = useMemo(
    () => [
      "/hero-src/hero.png",
      "/hero-src/detection.png",
      "/hero-src/alice.png",
      "/hero-src/memory.png",
    ],
    []
  );
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % frames.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [frames.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {frames.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            index === activeFrame ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(54,209,255,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── Full Hero3D scene ────────────────────────────────────────────────────────
export function Hero3D() {
  return (
    <div className="relative h-screen min-h-screen bg-[#050505]">
      {/* Sticky full-screen stage */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Hero source media backdrop */}
        <HeroBackdrop />

        {/* ── R3F Canvas ── */}
        <Canvas
          className="absolute inset-0 z-10"
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Deep star field behind everything */}
          <Stars
            radius={90}
            depth={60}
            count={5000}
            factor={3.5}
            saturation={0.3}
            fade
            speed={0.4}
          />

          <SceneLights />
          <Environment preset="night" />

          {/* Parallax points halo */}
          <ParallaxPoints />
        </Canvas>

        {/* ── Hero Text Overlay ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 42% 30% at 50% 50%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.26) 42%, rgba(0,0,0,0) 76%)",
            }}
          />
          <div className="flex flex-col items-center gap-5 text-center px-6">
            {/* Eyebrow pill */}
            <FadeUp
              delay={0.6}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 pointer-events-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
                Now in Beta
              </span>
            </FadeUp>

            {/* H1 */}
            <FadeUp delay={0.72}>
              <h1
                className="text-6xl md:text-[88px] font-bold tracking-tight text-white leading-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Think in{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #36d1ff 0%, #0ea5e9 55%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Aura
                </span>
              </h1>
            </FadeUp>

            {/* Sub */}
            <FadeUp
              delay={0.84}
              className="max-w-lg text-base md:text-lg text-white/45 leading-relaxed"
            >
              An advanced assistive vision system for the visually impaired, integrating real-time computer vision (YOLOv26n) with conversational AI (Google Gemini).
            </FadeUp>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Soft bridge into the next section to avoid a hard black gap */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-44 z-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.72) 58%, rgba(5,5,5,1) 100%)",
          }}
        />
      </div>
    </div>
  );
}
