"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_ROW_IMAGES = [
  { src: "/image src/Dashboard1.png", alt: "AuraVision dashboard screen 1" },
  { src: "/image src/Dashboard2.png", alt: "AuraVision dashboard screen 2" },
  { src: "/image src/Dashboard3.png", alt: "AuraVision dashboard screen 3" },
  { src: "/image src/Dashboard4.png", alt: "AuraVision dashboard screen 4" },
];

type ScatterState = {
  x: number;
  y: number;
  z: number;
  rotate: number;
  scale: number;
  blur: number;
  opacity: number;
};

const SCATTER_STATE = [
  { x: -220, y: -150, z: -260, rotate: -2.8, scale: 0.84, blur: 15, opacity: 0.4 },
  { x: 220, y: -150, z: -260, rotate: 2.8, scale: 0.84, blur: 15, opacity: 0.4 },
  { x: -148, y: 86, z: -138, rotate: -1.7, scale: 0.93, blur: 9, opacity: 0.62 },
  { x: 148, y: 86, z: -138, rotate: 1.7, scale: 0.93, blur: 9, opacity: 0.62 },
] as const satisfies readonly ScatterState[];

const ASSEMBLY_TIMING = [
  { start: 0.16, duration: 0.84 },
  { start: 0.2, duration: 0.88 },
  { start: 0.25, duration: 0.82 },
  { start: 0.31, duration: 0.89 },
];

export function AuraShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const isGridLockedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const topCards = topCardsRef.current.filter((card): card is HTMLDivElement => Boolean(card));
      const allCards = [...topCards];
      const totalAssemblyProgress = Math.max(...ASSEMBLY_TIMING.map((timing) => timing.start + timing.duration));
      const fadeInDuration = totalAssemblyProgress * 0.1;

      allCards.forEach((card, index) => {
        const scatter = SCATTER_STATE[index];
        gsap.set(card, {
          transformPerspective: 1200,
          x: scatter.x,
          y: scatter.y,
          z: scatter.z,
          rotate: scatter.rotate,
          scale: scatter.scale,
          opacity: 0,
          filter: `blur(${scatter.blur}px)`,
          willChange: "transform, filter, opacity",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=120%",
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          once: true,
          onUpdate: (self) => {
            if (self.progress >= 0.985) {
              isGridLockedRef.current = true;
            }
          },
        },
        onComplete: () => {
          isGridLockedRef.current = true;
        },
      });

      allCards.forEach((card, index) => {
        const scatter = SCATTER_STATE[index];
        tl.to(
          card,
          {
            opacity: scatter.opacity,
            duration: fadeInDuration,
            ease: "none",
          },
          0
        );
      });

      allCards.forEach((card, index) => {
        const timing = ASSEMBLY_TIMING[index];
        tl.to(
          card,
          {
            y: 0,
            x: 0,
            z: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: timing.duration,
          },
          timing.start
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isGridLockedRef.current) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2.8;
    const rotateX = (0.5 - py) * 2.8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.26,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (!isGridLockedRef.current) return;
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.38,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="technology" ref={sectionRef} className="relative z-0 mt-0 pt-0 bg-[#050505]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-16 text-center md:px-10 md:pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">Live System Interface</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">AuraVision Analytics Dashboard</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
          Real-time operational views from the core platform, including perception trends, guidance metrics, and spatial activity mapping.
        </p>
      </div>

      <div
        ref={pinRef}
        className="relative mt-0 flex h-screen items-center justify-center overflow-hidden px-4 pt-10 md:px-10 md:pt-12 [perspective:1800px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_100%)]"
        style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 28%, black 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_12%,rgba(54,209,255,0.1),transparent_64%),radial-gradient(ellipse_90%_66%_at_50%_100%,rgba(54,209,255,0.1),transparent_65%)]" />

        <div className="relative w-full max-w-[1480px]">
          <div className="grid grid-cols-12 gap-6">
            {TOP_ROW_IMAGES.map((item, index) => (
              <div
                key={item.src}
                ref={(el) => {
                  topCardsRef.current[index] = el;
                }}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="relative col-span-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-black/45 [transform-style:preserve-3d]"
                style={{ filter: "brightness(0.7)" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 44vw, (min-width: 768px) 47vw, 47vw"
                  className="object-contain p-2 md:p-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
