"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Developer", href: "/developer" },
  { label: "About", href: "/#about" },
];

const TECHNOLOGY_MENU_ITEMS = [
  {
    title: "Computer Vision",
    subtitle: "Real-time spatial awareness and identity",
    href: "/technology#edge-computer-vision",
  },
  {
    title: "Natural Language",
    subtitle: "Spoken, actionable intelligence",
    href: "/technology#multimodal-rag",
  },
  {
    title: "Intelligent Memory",
    subtitle: "Temporal RAG and persistence",
    href: "/technology#multimodal-rag",
  },
  {
    title: "Generative AI",
    subtitle: "The reasoning agent core",
    href: "/technology#agentic-reasoning",
  },
];

export function AuraNavbar() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const { scrollY } = useScroll();

  useEffect(() => {
    const syncHash = () => {
      setCurrentHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  // As user scrolls: glass becomes more opaque
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.7]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0.08, 0.2]);
  const blurAmount = useTransform(scrollY, [0, 120], [0, 20]);

  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;
  const borderBottom = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Glass pill background */}
      <motion.div
        className="absolute inset-0 rounded-none"
        style={{
          backgroundColor,
          borderBottom,
          backdropFilter,
        }}
      />

      {/* Logo */}
      <motion.a
        href="/"
        className="relative z-10 flex items-center gap-2 group"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Light blue glow dot */}
        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_2px_#36d1ff]" />
        <span
          className="text-white font-bold text-lg tracking-widest uppercase"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Aura<span className="text-primary"> V</span>
        </span>
      </motion.a>

      {/* Links */}
      <ul className="relative z-10 hidden md:flex gap-10 items-center">
        <li>
          <NavLink href="/" active={pathname === "/" && currentHash === ""}>
            Home
          </NavLink>
        </li>

        <li className="group relative">
          <a
            href="/technology"
            className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 group-hover:text-white ${pathname === "/technology" ? "text-[#36d1ff]" : "text-white/60"
              }`}
          >
            <span>Technologies</span>
            <span className="material-symbols-outlined text-[16px] leading-none">expand_more</span>
            <span className={`absolute -bottom-1 left-0 h-px bg-[#36d1ff] transition-all duration-300 ease-out ${pathname === "/technology" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
          </a>

          <div className="shell-profile-menu pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-[350px] -translate-x-1/2 translate-y-1 rounded-2xl p-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            {TECHNOLOGY_MENU_ITEMS.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="tech-dropdown-item block rounded-xl px-3 py-2.5"
              >
                <span className="block text-sm font-semibold tracking-wide text-slate-100">{item.title}</span>
                <span className="mt-0.5 block text-xs text-slate-400">{item.subtitle}</span>
              </a>
            ))}
          </div>
        </li>

        {NAV_LINKS.filter((link) => link.label !== "Home").map((link) => (
          <li key={link.label}>
            <NavLink
              href={link.href}
              active={(() => {
                if (link.href.includes("#")) {
                  const [targetPath, targetHash] = link.href.split("#");
                  const normalizedPath = targetPath || "/";
                  return pathname === normalizedPath && currentHash === `#${targetHash}`;
                }
                return pathname === link.href;
              })()}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="/technology#metrics"
        className="relative z-10 hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-[#36d1ff]/40 text-[#36d1ff] text-sm font-medium tracking-wide hover:bg-[#36d1ff]/10 transition-colors duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0 0 24px 3px rgba(54,209,255,0.38)" }}
        whileTap={{ scale: 0.97 }}
      >
        Explore Stack
      </motion.a>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`relative text-sm font-medium tracking-wide transition-colors duration-200 group ${
        active ? "text-[#36d1ff] opacity-100" : "text-white/50 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-[#36d1ff] transition-all duration-300 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
      {active ? (
        <span className="absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#36d1ff] shadow-[0_0_8px_#36d1ff]" />
      ) : null}
    </a>
  );
}
