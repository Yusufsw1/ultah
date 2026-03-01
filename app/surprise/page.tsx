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
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Fireworks />

      {showText && (
        <div className="relative z-20 flex flex-col items-center gap-3">
          {/* Big romantic title */}
          <h1 className="font-cormorant italic font-light text-xl md:text-9xl leading-tight">Happy Birthday</h1>

          {/* Name — big, gold-ish */}
          <p className="font-cormorant italic font-light text-xl md:text-9xl leading-tight">Sayangku </p>

          {/* Subtitle — Raleway spaced */}
          <p className="font-cormorant italic font-light text-xl md:text-base text-gray-400 ">Barakallahu fii umrik, Semoga semua doa dan harapanmu terkabul ❤️. Milad Mubarak.</p>
        </div>
      )}

      <div className="relative z-20 w-full">
        <Slideshow />
      </div>

      <div className="relative z-20 w-full">
        <LoveLetter />
      </div>
    </main>
  );
}
