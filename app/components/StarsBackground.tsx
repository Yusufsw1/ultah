"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  speed: number; // twinkle speed
  phase: number; // twinkle phase offset
  // shooting star
  isShooting?: boolean;
  vx?: number;
  vy?: number;
  tail?: number;
  life?: number;
  maxLife?: number;
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create static stars
    const stars: Star[] = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0.3 + Math.random() * 1.4,
      baseAlpha: 0.3 + Math.random() * 0.7,
      alpha: Math.random(),
      speed: 0.003 + Math.random() * 0.015, // how fast it twinkles
      phase: Math.random() * Math.PI * 2, // random start phase
    }));

    // Shooting stars pool
    const shootingStars: Star[] = [];

    function spawnShootingStar() {
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 6); // ~30–60 deg
      const speed = 8 + Math.random() * 10;
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        radius: 1.5,
        baseAlpha: 1,
        alpha: 1,
        speed: 0,
        phase: 0,
        isShooting: true,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tail: 80 + Math.random() * 60,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
    }

    // Spawn a shooting star every 4–8s
    let shootTimer = setTimeout(function spawn() {
      spawnShootingStar();
      shootTimer = setTimeout(spawn, 4000 + Math.random() * 4000);
    }, 2000);

    let frame = 0;
    let rafId: number;

    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static twinkling stars
      stars.forEach((star) => {
        star.alpha = star.baseAlpha * (0.5 + 0.5 * Math.sin(frame * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();

        // Cross flare for bigger stars
        if (star.radius > 1.1) {
          ctx.strokeStyle = `rgba(255,255,255,${star.alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2.5, star.y);
          ctx.lineTo(star.x + star.radius * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2.5);
          ctx.lineTo(star.x, star.y + star.radius * 2.5);
          ctx.stroke();
        }
      });

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life! += 1;
        s.x += s.vx!;
        s.y += s.vy!;

        const progress = s.life! / s.maxLife!;
        s.alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        // Tail gradient
        const grad = ctx.createLinearGradient(s.x - s.vx! * (s.tail! / 10), s.y - s.vy! * (s.tail! / 10), s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(s.x - s.vx! * (s.tail! / 10), s.y - s.vy! * (s.tail! / 10));
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (s.life! >= s.maxLife!) shootingStars.splice(i, 1);
      }

      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(shootTimer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}
