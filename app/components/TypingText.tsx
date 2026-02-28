"use client";

import { useEffect, useState } from "react";

interface Props {
  lines: string[]; // semua baris teks sekaligus
  speed?: number; // ms per karakter
  lineDelay?: number; // jeda antar baris (ms) setelah baris selesai
  className?: string;
}

/**
 * Mengetik baris satu per satu secara berurutan.
 * Baris berikutnya mulai setelah baris sebelumnya selesai + lineDelay.
 */
export default function TypingText({ lines, speed = 50, lineDelay = 500, className = "text-lg text-gray-300" }: Props) {
  // displayed[i] = teks yang sudah muncul untuk baris ke-i
  const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    // Sudah selesai semua
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    // Baris ini sudah selesai → tunggu lineDelay lalu pindah ke baris berikutnya
    if (currentChar > line.length) {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(timer);
    }

    // Ketik satu karakter
    const timer = setTimeout(() => {
      setDisplayed((prev) => {
        const next = [...prev];
        next[currentLine] = line.slice(0, currentChar);
        return next;
      });
      setCurrentChar((c) => c + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <div className="flex flex-col gap-2">
      {lines.map((_, i) => (
        <p key={i} className={className}>
          {displayed[i]}
          {/* Blinking cursor only on current active line */}
          {i === currentLine && currentLine < lines.length && <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] align-middle animate-pulse" />}
        </p>
      ))}
    </div>
  );
}
