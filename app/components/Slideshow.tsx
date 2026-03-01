"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/foto1.JPG", "/foto2.JPG", "/foto3.JPG", "/foto4.JPG", "/foto5.JPG", "/foto6.JPG", "/foto7.JPG", "/foto8.JPG", "/foto9.JPG", "/foto10.JPG", "/foto11.JPG", "/foto12.JPG"];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (current + 1) % images.length;
      setPrev(current);
      setFading(true);
      setTimeout(() => {
        setCurrent(nextIndex);
        setPrev(null);
        setFading(false);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="flex flex-col items-center justify-center py-16" style={{ background: "transparent" }}>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #f59e0b)" }} />
        <span>🌻</span>
        <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #f59e0b, transparent)" }} />
      </div>

      {/* Photo frame — ukuran proper */}
      <div className="relative w-[150px] h-[200px] md:w-[200px] md:h-[260px] rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(245,158,11,0.25), 0 0 0 1px rgba(245,158,11,0.15)" }}>
        {prev !== null && <Image key={`prev-${prev}`} src={images[prev]} alt="Memory" fill className="object-cover absolute inset-0" style={{ opacity: fading ? 0 : 1, transition: "opacity 800ms ease-in-out", zIndex: 1 }} />}
        <Image key={`cur-${current}`} src={images[current]} alt="Memory" fill className="object-cover absolute inset-0" style={{ zIndex: 2 }} />
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(10,8,0,0.55) 100%)", zIndex: 3 }} />
      </div>

      {/* Progress bar */}
      <div className="w-[150px] md:w-[200px] mt-5 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(245,158,11,0.12)" }}>
        <div key={current} className="h-full rounded-full" style={{ background: "#f59e0b", animation: "progress 4000ms linear forwards" }} />
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4 flex-wrap justify-center max-w-[200px]">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === current ? "18px" : "5px",
              height: "5px",
              background: i === current ? "#fbbf24" : "rgba(245,158,11,0.2)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}
