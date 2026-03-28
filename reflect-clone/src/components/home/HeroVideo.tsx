"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/hero-src/hero.png",
    "/hero-src/detection.png",
    "/hero-src/alice.png",
    "/hero-src/memory.png"
];

export function HeroVideo({ className }: { className?: string }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Cycles every 3 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
        </div>
    );
}