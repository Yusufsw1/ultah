"use client";

import { useRouter } from "next/navigation";
import StarsBackground from "./components/StarsBackground";
import TypingText from "./components/TypingText";
import GiftButton from "./components/Giftbutton";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    try {
      const audio = new Audio("/Christina Perri - A Thousand Years Lyrics.mp3");
      audio.volume = 0.7;
      audio.play().catch(() => console.warn("Autoplay blocked"));
    } catch (e) {
      console.warn("Audio error:", e);
    }
    router.push("/surprise");
  };

  return (
    <main className="relative flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      <StarsBackground />

      {/* Typing text — Raleway light, spaced out */}
      <TypingText
        lines={["Hari ini bukan hari biasa...", "Karena hari ini, seseorang yang mengubah hidupku lahir ke dunia."]}
        speed={55}
        lineDelay={400}
        className="text-base md:text-lg text-gray-300 font-cormorant italic font-light tracking-widest"
      />

      {/* Big title — Cormorant italic, cinematic */}
      <h1 className="font-cormorant italic font-light text-5xl md:text-7xl mt-8 leading-tight">Selamat Ulang Tahun Sayangku 🤍</h1>

      <GiftButton onClick={handleClick} />
    </main>
  );
}
