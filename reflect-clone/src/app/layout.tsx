"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { BlueYardLoader } from "@/components/app-ui/BlueYardLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("aura-visited") === "true";
    const rafId = requestAnimationFrame(() => {
      setShowLoader(!hasVisited);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showLoader && (
          <BlueYardLoader onComplete={() => setShowLoader(false)} />
        )}
        {children}
      </body>
    </html>
  );
}
