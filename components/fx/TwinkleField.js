"use client";

import { useEffect, useRef } from "react";

/**
 * Twinkling star canvas with the occasional shooting star and a very gentle
 * parallax drift. Pauses off-screen / hidden tab; static under reduced motion.
 */
export default function TwinkleField({ className = "", density = 1, shooting = true, tint = "gold" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const PALETTE = {
      gold: ["255,255,255", "255,224,138", "255,255,255", "158,208,255"],
      blue: ["255,255,255", "158,208,255", "179,157,255", "255,255,255"],
      violet: ["255,255,255", "179,157,255", "255,224,138", "158,208,255"],
    }[tint] || ["255,255,255"];

    let w = 0, h = 0, raf = 0, running = true, t = 0;
    let stars = [];
    let meteors = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(420, (w * h) / 5200) * density);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.12 ? 1.6 + Math.random() * 1.2 : 0.5 + Math.random() * 0.9,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 1.4, // twinkle speed
        c: PALETTE[(Math.random() * PALETTE.length) | 0],
        d: 0.02 + Math.random() * 0.05, // drift px/frame
      }));
    };

    const spawnMeteor = () => {
      const fromLeft = Math.random() < 0.5;
      meteors.push({
        x: fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4,
        y: Math.random() * h * 0.35,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 5),
        vy: 4 + Math.random() * 3,
        life: 0,
        max: 40 + Math.random() * 25,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += reduce ? 0 : 0.016;
      for (const s of stars) {
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.s * 2 + s.p);
        if (!reduce) { s.y -= s.d; if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; } }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${tw.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.r * (0.85 + tw * 0.3), 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.5) {
          // 4-point sparkle on the bright ones
          ctx.strokeStyle = `rgba(${s.c},${(tw * 0.35).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          const L = s.r * 3 * tw;
          ctx.beginPath();
          ctx.moveTo(s.x - L, s.y); ctx.lineTo(s.x + L, s.y);
          ctx.moveTo(s.x, s.y - L); ctx.lineTo(s.x, s.y + L);
          ctx.stroke();
        }
      }
      if (shooting && !reduce) {
        if (Math.random() < 0.006 && meteors.length < 2) spawnMeteor();
        meteors = meteors.filter((m) => m.life < m.max);
        for (const m of meteors) {
          m.life += 1; m.x += m.vx; m.y += m.vy;
          const a = 1 - m.life / m.max;
          const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
          g.addColorStop(0, `rgba(255,255,255,${a})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9); ctx.stroke();
        }
      }
    };

    const loop = () => { if (!running) return; draw(); if (!reduce) raf = requestAnimationFrame(loop); };
    const start = () => { if (raf) cancelAnimationFrame(raf); running = true; raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; };

    resize(); start();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.02 }); io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [density, shooting, tint]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
