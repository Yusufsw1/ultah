"use client";

import { useEffect, useState } from "react";
import Fireworks from "../components/Fireworks";
import LoveLetter from "../components/LoveLetter";
import Slideshow from "../components/Slideshow";

export default function SurprisePage() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "linear-gradient(180deg, #0a0800 0%, #130f00 50%, #1a1400 100%)" }}>
      <Fireworks name="Aida 🌻" />

      {showText && (
        <div className="relative z-20 flex flex-col items-center gap-3" style={{ animation: "fadeIn 1s ease forwards" }}>
          {/* Big romantic title */}
          <h1 className="font-cormorant italic font-light text-5xl md:text-7xl leading-tight" style={{ color: "#fef9c3" }}>
            Happy Birthday
          </h1>

          {/* Name */}
          <p className="font-cormorant italic font-light text-4xl md:text-6xl" style={{ color: "#fbbf24" }}>
            Sayangku
          </p>

          {/* Sunflower divider */}
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #f59e0b)" }} />
            <span>🌻</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #f59e0b, transparent)" }} />
          </div>

          {/* Subtitle */}
          <p className="font-cormorant italic text-lg md:text-xl max-w-sm" style={{ color: "#fde68a", opacity: 0.85 }}>
            Barakallahu fii umrik, semoga semua doa dan harapanmu terkabul ❤️ Milad Mubarak.
          </p>
        </div>
      )}

      <div className="relative z-20 w-full">
        <Slideshow />
      </div>

      <div className="relative z-20 w-full">
        <LoveLetter />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
