"use client";

import { useEffect, useState } from "react";

const MIN_MS = 2000;

/**
 * Launch splash: a rocket climbs through a star field while the page loads,
 * then the whole thing lifts away. Shown on full page loads only (client
 * navigations never remount the root layout).
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState("show"); // show → leave → gone

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("leave"), reduce ? 400 : MIN_MS);
    const t2 = setTimeout(() => setPhase("gone"), (reduce ? 400 : MIN_MS) + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash fixed inset-0 z-[200] flex flex-col items-center justify-center bg-space-950 ${phase === "leave" ? "splash-leave" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Deep Sky Society"
    >
      <div className="splash-stars absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_60%,rgba(245,185,66,0.12),transparent)]" aria-hidden />

      <div className="splash-rocket relative">
        <svg width="72" height="120" viewBox="0 0 72 120" aria-hidden>
          {/* flame */}
          <g className="splash-flame" style={{ transformOrigin: "36px 84px" }}>
            <path d="M28 84 Q36 118 44 84 Z" fill="#f5b942" opacity="0.9" />
            <path d="M31 84 Q36 106 41 84 Z" fill="#fff3c4" />
          </g>
          {/* body */}
          <path d="M36 4 C50 20 52 50 50 84 H22 C20 50 22 20 36 4 Z" fill="#e9eef8" />
          <path d="M36 4 C50 20 52 50 50 84 H36 Z" fill="#c8d1e3" />
          {/* window */}
          <circle cx="36" cy="40" r="7" fill="#0b1120" stroke="#5eb1ff" strokeWidth="2.5" />
          <circle cx="34" cy="38" r="2" fill="#9ed0ff" opacity="0.8" />
          {/* fins */}
          <path d="M22 62 L8 86 L22 84 Z" fill="#f5b942" />
          <path d="M50 62 L64 86 L50 84 Z" fill="#d9a02f" />
          {/* nozzle */}
          <rect x="28" y="82" width="16" height="6" rx="2" fill="#34446a" />
        </svg>
      </div>

      <p className="mt-10 font-display text-lg font-semibold tracking-wide text-white">
        Deep Sky <span className="text-star-400">Society</span>
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fg-subtle">Preparing for launch</p>
      <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="splash-bar h-full w-full origin-left bg-gradient-to-r from-star-500 to-sky-500" />
      </div>
    </div>
  );
}
