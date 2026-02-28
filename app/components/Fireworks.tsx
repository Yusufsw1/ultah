"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Fireworks() {
  useEffect(() => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 60,
        spread: 120,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 300);
  }, []);

  return null;
}
