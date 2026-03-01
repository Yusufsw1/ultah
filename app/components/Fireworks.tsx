"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  fade: number;
  size: number;
  color: string;
}
interface TextParticle {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  text: string;
}
interface Firework {
  shell: { x: number; y: number };
  trail: { x: number; y: number }[];
  vy: number;
  color: string;
  exploded: boolean;
  particles: Particle[];
  texts: TextParticle[];
}

const COLORS = ["#fbbf24", "#f59e0b", "#fde68a", "#fef08a", "#d97706", "#fef9c3", "#fcd34d", "#ffffff"];

function hexToRgb(hex: string) {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}

function createFW(canvas: HTMLCanvasElement, x?: number, y?: number): Firework {
  return {
    shell: { x: x ?? canvas.width * (0.2 + Math.random() * 0.6), y: canvas.height + 5 },
    trail: [],
    vy: -(13 + Math.random() * 7),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    exploded: false,
    particles: [],
    texts: [],
  };
}

function explodeFW(fw: Firework, name: string) {
  fw.exploded = true;
  const { x, y } = fw.shell;

  // Main burst
  for (let i = 0; i < 120; i++) {
    const angle = ((Math.PI * 2) / 120) * i + (Math.random() - 0.5) * 0.2;
    const speed = 1.5 + Math.random() * 5;
    fw.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, fade: 0.01 + Math.random() * 0.012, size: 1.5 + Math.random() * 2.5, color: fw.color });
  }

  // Gold sparkle layer
  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    fw.particles.push({ x, y, vx: Math.cos(angle) * (0.5 + Math.random() * 2.5), vy: Math.sin(angle) * (0.5 + Math.random() * 2.5), alpha: 1, fade: 0.018, size: 1.2, color: "#fef9c3" });
  }

  // Floating name
  fw.texts.push({ x, y: y - 10, vy: -0.6, alpha: 1, text: name });
}

interface Props {
  name?: string;
}

export default function Fireworks({ name = "Aida 🌻" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fwRef = useRef<Firework[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Initial burst
    const timers = [100, 600, 1200, 1900, 2700, 3600].map((d) => setTimeout(() => fwRef.current.push(createFW(canvas)), d));

    // Auto periodic
    const interval = setInterval(() => {
      fwRef.current.push(createFW(canvas));
      setTimeout(() => fwRef.current.push(createFW(canvas)), 500);
    }, 5000);

    // Click to launch
    function onClick(e: MouseEvent) {
      fwRef.current.push(createFW(canvas, e.clientX, e.clientY));
    }
    window.addEventListener("click", onClick);

    let rafId: number;
    function animate() {
      ctx.fillStyle = "rgba(10,8,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fwRef.current = fwRef.current.filter((fw) => {
        if (!fw.exploded) {
          fw.trail.push({ x: fw.shell.x, y: fw.shell.y });
          if (fw.trail.length > 12) fw.trail.shift();
          fw.shell.y += fw.vy;
          fw.vy += 0.22;
          if (fw.vy >= 0) explodeFW(fw, name);

          // Draw trail + shell
          fw.trail.forEach((t, i) => {
            ctx.beginPath();
            ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(253,224,71,${(i / fw.trail.length) * 0.5})`;
            ctx.fill();
          });
          ctx.beginPath();
          ctx.arc(fw.shell.x, fw.shell.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.shadowColor = "#fbbf24";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          fw.particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.07;
            p.vx *= 0.98;
            p.alpha -= p.fade;
          });
          fw.particles = fw.particles.filter((p) => p.alpha > 0);
          fw.texts.forEach((t) => {
            t.y += t.vy;
            t.vy += 0.005;
            t.alpha -= 0.004;
          });
          fw.texts = fw.texts.filter((t) => t.alpha > 0);

          // Draw particles
          fw.particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          // Draw floating name
          fw.texts.forEach((t) => {
            ctx.save();
            ctx.globalAlpha = t.alpha;
            ctx.font = `italic bold ${Math.min(38, Math.max(18, window.innerWidth * 0.035))}px 'Cormorant Garamond', serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = "#fef9c3";
            ctx.shadowColor = "#f59e0b";
            ctx.shadowBlur = 20;
            ctx.fillText(t.text, t.x, t.y);
            ctx.restore();
          });
        }

        return !(fw.exploded && fw.particles.length === 0 && fw.texts.length === 0);
      });

      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      timers.forEach(clearTimeout);
      clearInterval(interval);
      cancelAnimationFrame(rafId);
    };
  }, [name]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" style={{ width: "100%", height: "100%" }} />;
}
