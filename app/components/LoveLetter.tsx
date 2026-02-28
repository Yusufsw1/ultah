"use client";

import { useEffect, useState } from "react";

const letter = `
Terima kasih sudah lahir ke dunia ini.
Terima kasih sudah tumbuh sejauh ini.

Aku tahu hidup tidak selalu mudah.
Tapi kamu tetap kuat, tetap tersenyum,
dan tetap jadi pribadi yang luar biasa.

Semoga di usia yang baru ini,
semua doa kamu terkabul.
Semua lelah kamu terbayar.

Dan kalau boleh...
aku ingin tetap ada di setiap cerita bahagiamu.

Happy Birthday Sayangku Aida Fitriani 💙
`;

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

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

  return (
    <section className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full flex flex-col items-center gap-6">
        {/* Decorative top */}
        <p className="font-raleway text-xs tracking-[0.5em] uppercase text-gray-300">— untuk kamu —</p>

        {/* Letter text */}
        <div className="font-cormorant italic text-xl md:text-2xl leading-relaxed whitespace-pre-line text-center text-gray-700">
          {displayed}
          {/* blinking cursor while typing */}
          {!done && <span className="inline-block w-[2px] h-[1em] bg-pink-300 ml-1 align-middle animate-pulse" />}
        </div>

        {/* Signature */}
        {done && <p className="font-raleway font-light text-xs tracking-[0.4em] uppercase text-gray-300 animate-pulse">with love ♥</p>}
      </div>
    </section>
  );
}
