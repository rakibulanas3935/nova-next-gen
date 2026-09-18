"use client";

import { useEffect, useRef } from "react";

/**
 * "Flying through space" canvas: stars rush outward from a vanishing point
 * with subtle trails. Pauses when off-screen or when the tab is hidden,
 * and renders a static frame for users who prefer reduced motion.
 */
export default function WarpField({ className = "", density = 1, speed = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let w = 0, h = 0, cx = 0, cy = 0, raf = 0, running = true, last = performance.now();
    const stars = [];
    const COLORS = ["255,255,255", "255,224,138", "158,208,255", "179,157,255"];

    const spawn = (s = {}) => {
      s.x = (Math.random() - 0.5) * w * 1.6;
      s.y = (Math.random() - 0.5) * h * 1.6;
      s.z = Math.random() * w;
      s.pz = s.z;
      s.c = COLORS[(Math.random() * COLORS.length) | 0];
      return s;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cx = w / 2;
      cy = h * 0.55;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(520, (w * h) / 3800) * density);
      stars.length = 0;
      for (let i = 0; i < target; i += 1) stars.push(spawn({}));
    };

    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      const v = (reduce ? 0 : 0.045 * speed) * dt;
      for (const s of stars) {
        s.pz = s.z;
        s.z -= v * w * 0.02;
        if (s.z <= 1) spawn(s);
        const k = 260 / s.z;
        const pk = 260 / s.pz;
        const x = cx + s.x * k;
        const y = cy + s.y * k;
        const px = cx + s.x * pk;
        const py = cy + s.y * pk;
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) { spawn(s); continue; }
        const depth = 1 - s.z / w; // 0 far → 1 near
        const size = Math.max(0.4, depth * 2.2);
        ctx.strokeStyle = `rgba(${s.c},${(0.15 + depth * 0.85).toFixed(3)})`;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const loop = (now) => {
      if (!running) return;
      const dt = Math.min(48, now - last);
      last = now;
      draw(dt);
      if (!reduce) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density, speed]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
