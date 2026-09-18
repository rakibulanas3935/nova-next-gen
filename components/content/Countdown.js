"use client";

import { useEffect, useState } from "react";

const parts = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["days", Math.floor(s / 86400)],
    ["hrs", Math.floor((s % 86400) / 3600)],
    ["min", Math.floor((s % 3600) / 60)],
    ["sec", s % 60],
  ];
};

export default function Countdown({ to, className = "" }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div className={`skeleton h-16 w-64 ${className}`} />;
  if (target - now <= 0) {
    return <p className={`text-sm text-star-300 ${className}`}>Happening now — or already wrapped up.</p>;
  }

  return (
    <div className={`flex gap-3 ${className}`} role="timer" aria-live="off">
      {parts(target - now).map(([label, value]) => (
        <div key={label} className="glass min-w-[4.25rem] rounded-xl px-3 py-2 text-center">
          <div className="font-display text-2xl font-semibold tabular-nums text-white">{String(value).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-widest text-fg-subtle">{label}</div>
        </div>
      ))}
    </div>
  );
}
