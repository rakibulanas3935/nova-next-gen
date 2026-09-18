"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Looping, silent background video with a poster frame.
 * - Loads the file only when scrolled near, plays only while visible.
 * - Poster-only under prefers-reduced-motion or Data Saver.
 * - Slow Ken Burns drift on top so even the poster feels alive.
 */
export default function VideoBackdrop({ name, className, opacity = 0.55, kenBurns = true }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reduce || saveData) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!src) setSrc(`/video/${name}.mp4`);
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name, src]);

  return (
    <div className={clsx("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className={clsx("absolute inset-0", kenBurns && "fx-kenburns")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/video/${name}.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity }} />
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: ready ? opacity : 0 }}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={`/video/${name}.jpg`}
          onPlaying={() => setReady(true)}
          src={src || undefined}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,transparent_10%,rgba(4,6,13,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-space-950" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-space-950/70 to-transparent" />
    </div>
  );
}
