"use client";

import { useEffect, useRef } from "react";

/** Slowly drifting points joined by faint lines when close — a living star chart. */
export default function Constellation({ className = "", color = "158,208,255" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, running = true, pts = [];
    const LINK = 130;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }
      for (let i = 0; i < pts.length; i += 1) {
        for (let j = i + 1; j < pts.length; j += 1) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${color},${((1 - d / LINK) * 0.35).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${color},0.9)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => { if (!running) return; draw(); if (!reduce) raf = requestAnimationFrame(loop); };
    const start = () => { if (raf) cancelAnimationFrame(raf); running = true; raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; };

    resize(); start();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())); io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [color]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
