"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";

interface ScrollRevealWordsProps {
  text: string;
  className: string;
}

export function ScrollRevealWords({ text, className }: ScrollRevealWordsProps) {
  const words = useMemo(() => text.split(" "), [text]);
  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.7, once: false }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
    >
      {words.map((word, index) => {
        return (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.28em] inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0.14, y: 14, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.p>
  );
}
