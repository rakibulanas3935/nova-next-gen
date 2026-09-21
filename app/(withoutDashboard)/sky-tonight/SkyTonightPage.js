"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles, Compass } from "lucide-react";
import { moonPhase, upcomingShowers, currentSeason, METEOR_SHOWERS, SEASONAL_SKY } from "@/app/lib/astro";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const TIPS = [
  ["Let your eyes adapt", "Twenty minutes without white light. Use a red torch — it preserves night vision."],
  ["Check the Moon first", "A bright Moon washes out faint nebulae and galaxies. Plan deep-sky nights near new moon."],
  ["Averted vision", "Look slightly to the side of a faint object. The edge of your retina is more sensitive to dim light."],
  ["Dress for two hours colder", "Standing still at night gets cold fast, even in summer."],
  ["Start with binoculars", "10x50s show craters, Jupiter's moons, star clusters and the Andromeda galaxy."],
  ["Use a planisphere or app", "Stellarium (free) shows exactly what's up from your location tonight."],
];

function MoonDisc({ fraction, size = 96 }) {
  const r = size / 2;
  const waxing = fraction <= 0.5;
  const illum = waxing ? fraction * 2 : (1 - fraction) * 2;
  const rx = Math.abs(1 - illum * 2) * r;
  const lit = "#fbe7a8", dark = "#1b1540";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={r} cy={r} r={r} fill={dark} />
      <path d={waxing ? `M${r},0 A${r},${r} 0 0 1 ${r},${size} Z` : `M${r},0 A${r},${r} 0 0 0 ${r},${size} Z`} fill={lit} />
      <ellipse cx={r} cy={r} rx={rx} ry={r} fill={illum > 0.5 ? lit : dark} />
    </svg>
  );
}

const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={`p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md ${className}`}
  >
    {children}
  </motion.div>
);

const H2 = ({ children }) => (
  <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">{children}</h2>
);

export default function SkyTonightPage() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) return null;

  const moon = moonPhase(now);
  const showers = upcomingShowers(now, 3);
  const season = currentSeason(now);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen py-20 px-4 sm:px-10 text-white relative">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">🌙 Sky Tonight</h1>
          <p className="text-gray-300">Moon phase, the next meteor showers and what to look for this season — computed on your device, no clouds required.</p>
        </div>

        {/* Right now */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex items-center gap-5">
            <MoonDisc fraction={moon.fraction} />
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-300 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5" /> Moon tonight</p>
              <p className="text-xl font-semibold mt-1">{moon.name}</p>
              <p className="text-sm text-gray-300">{moon.illumination}% illuminated · day {Math.floor(moon.age)}</p>
              <p className="text-xs text-gray-400 mt-2">{moon.darkSky ? "Dark skies — great for deep-sky objects." : `Next new moon ${fmt(moon.nextNew)}.`}</p>
            </div>
          </Card>
          <Card delay={0.1}>
            <p className="text-xs uppercase tracking-widest text-purple-300 flex items-center gap-1.5 mb-3"><Sparkles className="w-3.5 h-3.5" /> Meteor showers</p>
            <ul className="space-y-3">
              {showers.map((s) => {
                const days = Math.round((s.peak - now) / 86400000);
                return (
                  <li key={s.name} className="flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-gray-400">Peak {fmt(s.peak)} · ZHR {s.zhr}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 h-fit rounded-full bg-purple-500/20 text-purple-200">{days <= 0 ? "Tonight" : `${days}d`}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-purple-300 flex items-center gap-1.5 mb-3"><Compass className="w-3.5 h-3.5" /> This season</p>
            <p className="font-medium capitalize">{season.key} sky</p>
            <p className="text-sm text-gray-300 mt-1">{season.constellations.join(" · ")}</p>
            <p className="text-xs text-gray-400 mt-2">{season.tip}</p>
          </Card>
        </div>

        {/* Meteor calendar */}
        <div className="space-y-4">
          <H2>☄️ Meteor showers this year</H2>
          <p className="text-gray-300 text-sm">Peak dates are approximate (±1 day). ZHR is the ideal-sky hourly rate — expect a third of that from a typical dark site.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METEOR_SHOWERS.map((s, i) => (
              <Card key={s.name} delay={i * 0.04} className="flex gap-4 !p-5">
                <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-white/5 py-2">
                  <span className="text-[10px] uppercase tracking-widest text-purple-300">{MONTHS[s.month - 1]}</span>
                  <span className="text-2xl font-bold">{s.day}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{s.name} <span className="ml-1 text-xs font-normal text-gray-400">ZHR {s.zhr}</span></p>
                  <p className="text-xs text-gray-400">Parent: {s.parent}</p>
                  <p className="text-sm text-gray-300 mt-1">{s.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Seasons */}
        <div className="space-y-4">
          <H2>🗓️ Season by season</H2>
          <p className="text-gray-300 text-sm">Northern-hemisphere evening sky. Constellations rise about two hours earlier each month.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(SEASONAL_SKY).map(([key, s], i) => (
              <Card key={key} delay={i * 0.05}>
                <p className="text-xs uppercase tracking-widest text-purple-300">{key}</p>
                <p className="text-xs text-gray-400 mt-1">{s.months.map((m) => MONTHS[m - 1]).join(" · ")}</p>
                <p className="mt-3 text-white">{s.constellations.join(", ")}</p>
                <ul className="mt-2 text-sm text-gray-300 space-y-0.5">
                  {s.highlights.map((h) => <li key={h}>✦ {h}</li>)}
                </ul>
                <p className="mt-3 text-sm italic text-gray-400 border-t border-white/10 pt-3">{s.tip}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          <H2>🔦 Six things that make a night out better</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map(([t, d], i) => (
              <Card key={t} delay={i * 0.04} className="!p-5">
                <p className="text-xs text-purple-300">0{i + 1}</p>
                <p className="font-semibold mt-1">{t}</p>
                <p className="text-sm text-gray-300 mt-1">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
