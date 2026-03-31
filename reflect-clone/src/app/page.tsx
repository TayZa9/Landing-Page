import { AuraNavbar } from "@/components/layout/AuraNavbar";
import HeroSplit from "@/components/home/HeroSplit";
import { ContextGapSection } from "@/components/home/ContextGapSection";
import { LogoTicker } from "@/components/home/LogoTicker";
import { MeetAlice } from "@/components/home/MeetAlice";
import { AuraShowcase } from "@/components/home/AuraShowcase";
import { VisionShowcase } from "@/components/home/VisionShowcase";
import { TechnologiesSection } from "@/components/home/TechnologiesSection";

const FOOTER_LINKS = ["Privacy", "Terms", "Contact"] as const;

export default function Home() {
  return (
    <main
      className="relative bg-[#050505] text-white overflow-x-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Fixed Glassmorphism Navbar ── */}
      <AuraNavbar />

      <HeroSplit />

      <div className="mt-40 md:mt-48">
        <ContextGapSection />
      </div>

      <TechnologiesSection />

      <VisionShowcase />

      <section id="developer" className="relative z-10 bg-[#050505] px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center md:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Developer Team</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">Meet The Creators of AuraVision</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Explore the dedicated team page to see the 4-member hackathon squad who designed the platform architecture,
            AI pipeline, and cinematic product experience.
          </p>
          <a
            href="/developer"
            className="mt-6 inline-flex rounded-full border border-cyan-300/45 bg-cyan-500/12 px-5 py-2.5 text-sm font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-500/20"
          >
            Open Team Page
          </a>
        </div>
      </section>

      <div className="relative z-10">
        <MeetAlice />
      </div>

      <div className="relative z-10">
        <AuraShowcase />
      </div>

      <section id="about" className="relative z-10 py-20 bg-[#050505]" />

      <section className="relative z-10 border-t border-white/5 bg-[#050505] py-12">
        <LogoTicker />
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-8 flex flex-col md:flex-row items-center justify-between text-white/20 text-xs tracking-wide">
        <span>© 2026 Aura V. All rights reserved.</span>
        <span className="flex gap-6 mt-4 md:mt-0">
          {FOOTER_LINKS.map((label) => (
            <a key={label} href="#" className="hover:text-white/50 transition-colors">
              {label}
            </a>
          ))}
        </span>
      </footer>
    </main>
  );
}
