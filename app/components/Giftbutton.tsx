"use client";

import { useState } from "react";

interface Props {
  onClick: () => void;
}

export default function GiftButton({ onClick }: Props) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    setTimeout(onClick, 600);
  }

  return (
    <div className="relative flex flex-col items-center mt-12">
      {/* Wrapper kerlap-kerlip */}
      <div className="relative">
        {/* Sparkles mengelilingi kado */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="absolute text-yellow-200 select-none pointer-events-none"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.size,
              animation: `sparkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
              opacity: 0,
            }}
          >
            {s.char}
          </span>
        ))}

        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 40px 10px rgba(236,72,153,0.25)",
            animation: "pulseRing 2s ease-in-out infinite",
          }}
        />

        {/* Gift button */}
        <button
          onClick={handleClick}
          disabled={clicked}
          className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full transition-transform duration-300"
          style={{
            background: "radial-gradient(circle at 35% 35%, #f472b6, #db2777)",
            boxShadow: "0 8px 30px rgba(219,39,119,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            transform: clicked ? "scale(0.85)" : "scale(1)",
          }}
        >
          {/* Ribbon horizontal */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5" style={{ background: "rgba(255,255,255,0.2)" }} />
          {/* Ribbon vertical */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5" style={{ background: "rgba(255,255,255,0.2)" }} />
          {/* Bow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            <div
              className="w-5 h-4 rounded-full"
              style={{
                background: "rgba(255,255,255,0.35)",
                borderRadius: "50% 0 0 50%",
                transform: "rotate(-20deg)",
              }}
            />
            <div
              className="w-5 h-4 rounded-full"
              style={{
                background: "rgba(255,255,255,0.35)",
                borderRadius: "0 50% 50% 0",
                transform: "rotate(20deg)",
              }}
            />
          </div>

          {/* Emoji kado */}
          <span className="text-4xl z-10 relative" style={{ animation: clicked ? "none" : "bounce 1.8s ease-in-out infinite" }}>
            🎁
          </span>
        </button>
      </div>

      {/* Hint text di bawah */}
      <p className="font-raleway text-[10px] tracking-[0.35em] uppercase text-white/20 mt-6" style={{ animation: "floatUpDown 2s 1s ease-in-out infinite" }}>
        tap to open ✨
      </p>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0;   transform: scale(0.5) rotate(0deg);   }
          50%       { opacity: 1;   transform: scale(1.2) rotate(180deg); }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 30px 8px rgba(236,72,153,0.2); }
          50%       { box-shadow: 0 0 55px 18px rgba(236,72,153,0.45); }
        }
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px);  opacity: 0.5; }
          50%       { transform: translateY(-5px); opacity: 1;   }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

// Posisi & karakter sparkle di sekitar kado
const SPARKLES = [
  { char: "✦", top: "-30px", left: "10px", size: "14px", duration: 1.8, delay: 0 },
  { char: "🌻", top: "-24px", left: "85px", size: "16px", duration: 2.1, delay: 0.3 },
  { char: "✦", top: "10px", left: "-28px", size: "12px", duration: 1.6, delay: 0.5 },
  { char: "✧", top: "10px", left: "118px", size: "16px", duration: 2.3, delay: 0.2 },
  { char: "🌻", top: "60px", left: "-36px", size: "18px", duration: 1.9, delay: 0.7 },
  { char: "✦", top: "60px", left: "120px", size: "12px", duration: 2.0, delay: 0.4 },
  { char: "✧", top: "105px", left: "-24px", size: "14px", duration: 1.7, delay: 0.6 },
  { char: "🌻", top: "108px", left: "112px", size: "16px", duration: 2.2, delay: 0.1 },
  { char: "✦", top: "138px", left: "20px", size: "12px", duration: 1.5, delay: 0.8 },
  { char: "✧", top: "138px", left: "80px", size: "10px", duration: 2.4, delay: 0.35 },
  { char: "🌻", top: "-8px", left: "46px", size: "14px", duration: 1.6, delay: 0.9 },
  { char: "✦", top: "144px", left: "50px", size: "8px", duration: 2.0, delay: 0.55 },
];
