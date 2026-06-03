"use client";

import { useEffect, useRef } from "react";

const glyphs = " .,:;irsXA253hMHGS#9B&@";
const noise = "!@#$%&*?";

type Particle = {
  char: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  lit: number;
};

export function AsciiHologram() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const radius = 55;
    let cursor: { x: number; y: number } | null = null;
    let frame = 0;
    let particles: Particle[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = [];

      const cols = Math.max(24, Math.floor(width / 13));
      const rows = Math.max(24, Math.floor(height / 14));
      const cx = cols / 2;
      const cy = rows / 2;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const dx = (x - cx) / (cols * 0.28);
          const dy = (y - cy) / (rows * 0.34);
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 1) continue;
          const shade = Math.max(0, Math.min(glyphs.length - 1, Math.floor((1 - d) * glyphs.length)));
          particles.push({
            char: glyphs[shade],
            x: x * 13 + width * 0.05,
            y: y * 14 + height * 0.08,
            baseX: x * 13 + width * 0.05,
            baseY: y * 14 + height * 0.08,
            vx: 0,
            vy: 0,
            lit: 0,
          });
        }
      }
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);
      ctx.font = "12px var(--font-plex-mono), monospace";
      ctx.textBaseline = "middle";

      for (const p of particles) {
        if (cursor) {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < radius) {
            const force = (1 - distance / radius) * 1.8;
            p.vx += (dx / Math.max(distance, 1)) * force;
            p.vy += (dy / Math.max(distance, 1)) * force;
            p.lit = Math.max(p.lit, force);
          }
        }

        p.vx += (p.baseX - p.x) * 0.18;
        p.vy += (p.baseY - p.y) * 0.18;
        p.vx *= 0.72;
        p.vy *= 0.72;
        p.x += p.vx;
        p.y += p.vy;
        p.lit *= 0.88;

        const glitched = p.lit > 0.45 && frame % 4 === 0;
        ctx.fillStyle = p.lit > 0.15 ? "#f2fff8" : "rgba(218, 232, 224, 0.58)";
        ctx.fillText(glitched ? noise[Math.floor(Math.random() * noise.length)] : p.char, p.x, p.y);
      }

      if (cursor) {
        ctx.strokeStyle = "rgba(237,237,237,0.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    build();
    const resize = new ResizeObserver(build);
    resize.observe(canvas);

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => {
      cursor = null;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    draw();

    return () => {
      resize.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="ascii-stage">
      <canvas ref={ref} aria-label="interactive ASCII profile hologram" />
    </div>
  );
}
