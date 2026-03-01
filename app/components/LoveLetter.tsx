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
    <section className="min-h-screen flex items-start justify-center pl-10 pr-10">
      <div className="max-w-xl w-full flex flex-col items-center gap-8 pt-10">
        {/* Decorative top */}
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-900/50" />
          <p className="font-raleway text-[10px] tracking-[0.5em] uppercase text-pink-300/50">— untuk kamu —</p>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-900/50" />
        </div>

        {/* Letter — mulai dari atas, tumbuh ke bawah */}
        <div className="w-full font-cormorant italic text-xl md:text-2xl leading-[2] whitespace-pre-line text-left text-gray-200" style={{ minHeight: "4rem" }}>
          {displayed}
          {!done && <span className="inline-block w-[2px] h-[1.1em] bg-pink-300 ml-1 align-middle animate-pulse" />}
          {/* anchor untuk auto-scroll */}
          <div ref={bottomRef} />
        </div>

        {/* Signature muncul setelah selesai */}
        {done && (
          <div className="flex flex-col items-center gap-2 mt-4 animate-[fadeIn_1s_ease_forwards]">
            <div className="w-16 h-px bg-pink-400/30" />
            <p className="font-raleway font-light text-xs tracking-[0.45em] uppercase text-pink-300/60">with love ♥</p>
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
