"use client";

import { useMemo, type MouseEvent } from "react";
import { ShieldCheck, Zap, Eye, Smartphone } from "lucide-react";

type BentoCard = {
  title: string;
  subtitle: string;
  description: string;
  className: string;
  pillar: string;
  kind: "vision" | "latency" | "privacy" | "sync";
};

const CARDS: BentoCard[] = [
  {
    title: "Vision Engine",
    subtitle: "Real-time Perception",
    description: "Live camera-scan intelligence that maps motion, depth, and spatial context continuously.",
    className: "col-span-4 md:col-span-2 md:row-span-2 min-h-[340px]",
    pillar: "Real-time Perception",
    kind: "vision",
  },
  {
    title: "Zero Latency",
    subtitle: "Spatial Memory",
    description: "Fast-path inference streams your environment state instantly for immediate awareness.",
    className: "col-span-4 md:col-span-2 min-h-[200px]",
    pillar: "Spatial Memory",
    kind: "latency",
  },
  {
    title: "Privacy",
    subtitle: "On-device Shield",
    description: "Secure processing pathways keep sensitive context private and encrypted.",
    className: "col-span-4 md:col-span-1 min-h-[170px]",
    pillar: "Trust Layer",
    kind: "privacy",
  },
  {
    title: "Cross-device Sync",
    subtitle: "Context Continuity",
    description: "Seamless memory handoff between devices so your spatial timeline follows you.",
    className: "col-span-4 md:col-span-1 min-h-[170px]",
    pillar: "Cross-device Sync",
    kind: "sync",
  },
];

function VisionScanVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(54,209,255,0.1),transparent_45%),linear-gradient(145deg,rgba(6,20,28,0.9),rgba(4,8,12,0.8))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(54,209,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(54,209,255,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute left-0 right-0 top-1/2 h-px animate-[scanPulse_3.2s_linear_infinite] bg-primary shadow-[0_0_18px_rgba(54,209,255,0.35)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_44%,rgba(54,209,255,0.1)_0%,transparent_38%)]" />
    </div>
  );
}

function LatencyTrailVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-[linear-gradient(150deg,rgba(4,10,18,0.9),rgba(1,5,9,0.86))]">
      <div className="absolute left-[-28%] top-1/2 h-[2px] w-[64%] -translate-y-1/2 animate-[trail_1.6s_ease-in-out_infinite] bg-primary shadow-[0_0_20px_rgba(54,209,255,0.35)]" />
      <div className="absolute left-[-15%] top-[58%] h-[1px] w-[44%] -translate-y-1/2 animate-[trail_1.2s_ease-in-out_infinite] bg-primary shadow-[0_0_14px_rgba(54,209,255,0.28)] [animation-delay:140ms]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_50%,transparent_50%,rgba(54,209,255,0.1)_100%)]" />
    </div>
  );
}

function PrivacyVisual() {
  return (
    <div className="relative flex h-full items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_50%_30%,rgba(54,209,255,0.1),rgba(0,0,0,0)_52%)]">
      <ShieldCheck className="h-11 w-11 text-[#36d1ff] drop-shadow-[0_0_12px_rgba(54,209,255,0.35)]" />
    </div>
  );
}

function SyncVisual() {
  return (
    <div className="relative flex h-full items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_50%_28%,rgba(54,209,255,0.1),rgba(0,0,0,0)_56%)]">
      <Smartphone className="h-10 w-10 text-[#36d1ff] drop-shadow-[0_0_10px_rgba(54,209,255,0.35)]" />
    </div>
  );
}

function CardVisual({ kind }: { kind: BentoCard["kind"] }) {
  if (kind === "vision") return <VisionScanVisual />;
  if (kind === "latency") return <LatencyTrailVisual />;
  if (kind === "privacy") return <PrivacyVisual />;
  return <SyncVisual />;
}

export function FeatureBento() {
  const badgeMap = useMemo(
    () => ({
      vision: Eye,
      latency: Zap,
      privacy: ShieldCheck,
      sync: Smartphone,
    }),
    []
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-24 md:px-8" data-scan-reactive>
      <style>{`
        @keyframes trail {
          0% { transform: translate3d(-55%, -50%, 0); opacity: 0; }
          18% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translate3d(230%, -50%, 0); opacity: 0; }
        }
        @keyframes scanPulse {
          0% { transform: translateY(-140px); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateY(140px); opacity: 0.2; }
        }
      `}</style>

      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-[#36d1ff]/80">Aura Features</p>
        <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Perception architecture designed for high-speed cognition
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4 md:gap-5">
        {CARDS.map((card) => {
          const BadgeIcon = badgeMap[card.kind];
          return (
            <article
              key={card.title}
              onMouseMove={handleMove}
              className={`group relative overflow-hidden rounded-3xl border border-[#36d1ff]/20 bg-white/5 p-4 backdrop-blur-xl md:p-5 ${card.className}`}
              data-scan-reactive
              style={{
                backgroundImage:
                  "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(54,209,255,0.1), transparent 58%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#36d1ff]/25 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-[#b4edff]">
                  <BadgeIcon className="h-3.5 w-3.5 text-[#36d1ff]" />
                  {card.pillar}
                </span>
              </div>

              <div className="relative mb-5 h-[46%] min-h-[92px]">
                <CardVisual kind={card.kind} />
              </div>

              <div className="relative space-y-1.5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">{card.subtitle}</p>
                <h4 className="text-xl font-semibold text-white">{card.title}</h4>
                <p className="text-sm leading-relaxed text-white/60">{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
