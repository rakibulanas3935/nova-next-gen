"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const fine = () => window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Soft light that follows the cursor (desktop only). */
export function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!fine()) return;
    const el = ref.current;
    let raf = 0, x = 0, y = 0;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`; el.style.opacity = "1"; raf = 0; });
    };
    const leave = () => { el.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: "radial-gradient(circle, rgba(245,185,66,0.10) 0%, rgba(94,177,255,0.06) 35%, transparent 65%)", mixBlendMode: "screen" }}
    />
  );
}

/** Thin gradient bar showing scroll progress. */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const p = h.scrollHeight - h.clientHeight;
      el.style.transform = `scaleX(${p > 0 ? h.scrollTop / p : 0})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-star-500 via-sky-500 to-nebula-500 shadow-[0_0_12px_rgba(245,185,66,0.6)]" style={{ transform: "scaleX(0)" }} />;
}

/**
 * Mouse parallax container. Children with `data-depth="0.5"` move
 * proportionally to pointer position (desktop only).
 */
export function MouseParallax({ children, className, strength = 24 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fine()) return;
    const el = ref.current;
    const layers = el.querySelectorAll("[data-depth]");
    let raf = 0, tx = 0, ty = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(() => {
        layers.forEach((l) => {
          const d = parseFloat(l.dataset.depth || "0.3");
          l.style.transform = `translate3d(${(-tx * strength * d).toFixed(1)}px, ${(-ty * strength * d).toFixed(1)}px, 0)`;
        });
        raf = 0;
      });
    };
    const reset = () => layers.forEach((l) => { l.style.transform = ""; });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); };
  }, [strength]);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Card that tilts toward the cursor with a moving highlight. */
export function TiltCard({ children, className, max = 8 }) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(fine()), []);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => { const el = ref.current; el.style.transform = ""; };

  return (
    <div
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? onLeave : undefined}
      className={clsx("tilt-card relative will-change-transform transition-transform duration-200 ease-out", className)}
    >
      {children}
      {enabled && <span aria-hidden className="tilt-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" />}
    </div>
  );
}
