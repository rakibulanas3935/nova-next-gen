"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sparkles, Compass, ArrowRight } from "lucide-react";
import { moonPhase, upcomingShowers, currentSeason } from "@/lib/astro";
import { Card, Badge } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";

function MoonDisc({ fraction, size = 96 }) {
  // Draw an illuminated moon: a light disc with a dark "shadow" ellipse.
  const r = size / 2;
  const waxing = fraction <= 0.5;
  const illum = waxing ? fraction * 2 : (1 - fraction) * 2; // 0..1
  const rx = Math.abs(1 - illum * 2) * r; // width of the terminator ellipse
  const terminatorFill = illum > 0.5 ? "#fbe7a8" : "#182238";
  const sideFill = "#fbe7a8";
  const darkFill = "#182238";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="rgba(251,231,168,0)" />
          <stop offset="100%" stopColor="rgba(251,231,168,0.25)" />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r} fill={darkFill} />
      {/* lit half */}
      <path d={waxing ? `M${r},0 A${r},${r} 0 0 1 ${r},${size} Z` : `M${r},0 A${r},${r} 0 0 0 ${r},${size} Z`} fill={sideFill} />
      {/* terminator */}
      <ellipse cx={r} cy={r} rx={rx} ry={r} fill={terminatorFill} />
      <circle cx={r} cy={r} r={r} fill="url(#moonGlow)" />
    </svg>
  );
}

export default function SkyTonight({ compact = false }) {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) {
    return <div className="skeleton h-56 w-full rounded-2xl" />;
  }

  const moon = moonPhase(now);
  const showers = upcomingShowers(now, compact ? 2 : 3);
  const season = currentSeason(now);

  return (
    <div className={compact ? "grid gap-4 md:grid-cols-3" : "grid gap-5 lg:grid-cols-3"}>
      <Card className="flex items-center gap-5 p-5">
        <MoonDisc fraction={moon.fraction} size={compact ? 72 : 96} />
        <div>
          <p className="eyebrow mb-1 flex items-center gap-1.5"><Moon className="h-3.5 w-3.5" /> Moon tonight</p>
          <p className="font-display text-xl font-semibold text-white">{moon.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{moon.illumination}% illuminated · day {Math.floor(moon.age)}</p>
          <p className="mt-2 text-xs text-fg-subtle">
            {moon.darkSky ? "Dark skies — great for deep-sky objects." : `Next new moon ${formatDate(moon.nextNew)}.`}
          </p>
        </div>
      </Card>

      <Card className="p-5">
        <p className="eyebrow mb-3 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Meteor showers</p>
        <ul className="space-y-3">
          {showers.map((s) => {
            const days = Math.round((s.peak - now) / 86400000);
            return (
              <li key={s.name} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{s.name}</p>
                  <p className="text-xs text-fg-subtle">Peak {formatDate(s.peak)} · ZHR {s.zhr}</p>
                </div>
                <Badge tone={days <= 3 ? "gold" : "muted"}>{days <= 0 ? "Tonight" : `${days}d`}</Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="p-5">
        <p className="eyebrow mb-3 flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> This season</p>
        <p className="font-medium capitalize text-white">{season.key} sky</p>
        <p className="mt-1 text-sm text-fg-muted">{season.constellations.slice(0, 4).join(" · ")}</p>
        <p className="mt-2 text-xs text-fg-subtle line-clamp-2">{season.tip}</p>
        {!compact && (
          <Link href="/sky-tonight" className="mt-3 inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300">
            Full sky guide <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </Card>
    </div>
  );
}
