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
    }, 2000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Title */}
      <h2 className="font-cormorant italic font-light text-4xl md:text-5xl mb-2">Kenangan Kita 🤍</h2>

      {/* Photo frame */}
      <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20">
        {prev !== null && (
          <Image
            key={`prev-${prev}`}
            src={images[prev]}
            alt="Memory"
            fill
            className="object-cover absolute inset-0"
            style={{
              opacity: fading ? 0 : 1,
              transition: "opacity 800ms ease-in-out",
              zIndex: 1,
            }}
          />
        )}
        <Image key={`cur-${current}`} src={images[current]} alt="Memory" fill className="object-cover absolute inset-0" style={{ zIndex: 2 }} />
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
            zIndex: 3,
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-[300px] md:w-[400px] mt-5 h-[1px] bg-white/10 rounded-full overflow-hidden">
        <div key={current} className="h-full bg-pink-300/60 rounded-full" style={{ animation: "progress 4000ms linear forwards" }} />
      </div>

      {/* Dots */}
      <div className="flex gap-3 mt-4">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "#f9a8d4" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
