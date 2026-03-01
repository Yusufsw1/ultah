"use client";

import { useEffect, useState, useRef } from "react";

const letter = `Terima kasih sudah lahir ke dunia ini.
Terima kasih sudah tumbuh sejauh ini.

Aku tahu hidup tidak selalu mudah.
Tapi kamu tetap kuat, tetap tersenyum,
dan tetap jadi pribadi yang luar biasa.

Semoga di usia yang baru ini,
semua doa kamu terkabul.
Semua lelah kamu terbayar.

Dan kalau boleh...
aku ingin tetap ada di setiap cerita bahagiamu.

Happy Birthday Sayangku Aida Fitriani 💙`;

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(letter.slice(0, index));
      index++;
      if (index > letter.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll ke bawah mengikuti teks yang sedang diketik
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [displayed]);

  return (
    <section className="min-h-screen flex items-start justify-center px-10" style={{ background: "linear-gradient(160deg, #0a0800 0%, #130f00 50%, #1a1400 100%)" }}>
      <div className="max-w-xl w-full flex flex-col items-center gap-8 pt-10">
        {/* Decorative top */}
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3))" }} />
          <p className="font-raleway text-[10px] tracking-[0.5em] uppercase" style={{ color: "#d97706" }}>
            — untuk kamu —
          </p>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.3), transparent)" }} />
        </div>

        {/* Letter */}
        <div className="w-full font-cormorant italic text-xl md:text-2xl leading-[2] whitespace-pre-line text-left" style={{ color: "#fef3c7", minHeight: "4rem" }}>
          {displayed}
          {!done && <span className="inline-block w-[2px] h-[1.1em] ml-1 align-middle animate-pulse" style={{ background: "#fbbf24" }} />}
          <div ref={bottomRef} />
        </div>

        {/* Signature */}
        {done && (
          <div className="flex flex-col items-center gap-3 mt-4" style={{ animation: "fadeIn 1s ease forwards" }}>
            <span style={{ fontSize: "1.5rem" }}>🌻</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }} />
            <p className="font-raleway font-light text-xs tracking-[0.45em] uppercase" style={{ color: "#d97706" }}>
              with love ♥
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
