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
    <section className="flex flex-col items-center justify-center  bg-black text-white">
      {/* Photo frame */}
      <div className="relative w-[150px] h-[200px] md:w-[150px] md:h-[200px] rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 mb-4 mt-4">
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
          className="absolute inset-0 rounded-3xl pointer-events-none mb-8"
          style={{
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
            zIndex: 3,
          }}
        />
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
