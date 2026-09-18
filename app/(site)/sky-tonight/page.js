import { METEOR_SHOWERS, SEASONAL_SKY } from "@/lib/astro";
import { PageHero, Section, SectionHeader, Card, Badge } from "@/components/ui/primitives";
import SkyTonight from "@/components/home/SkyTonight";

export const metadata = {
  title: "Sky tonight",
  description: "Tonight's Moon phase, the year's meteor showers and what to look for each season — a quick observing guide from Deep Sky Society.",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TIPS = [
  ["Let your eyes adapt", "Twenty minutes without white light. Use a red torch — it preserves night vision."],
  ["Check the Moon first", "A bright Moon washes out faint nebulae and galaxies. Plan deep-sky nights near new moon; planets and the Moon itself don't care."],
  ["Averted vision", "Look slightly to the side of a faint object. The edge of your retina is more sensitive to dim light."],
  ["Dress for two hours colder", "Standing still at night gets cold fast, even in summer. Bring more layers than feels reasonable."],
  ["Start with binoculars", "10x50s show craters, Jupiter's moons, star clusters and the Andromeda galaxy — and you already know how to use them."],
  ["Use a planisphere or app", "Stellarium (free) shows exactly what's up from your location at any time. Set it to tonight before you head out."],
];

export default function SkyTonightPage() {
  return (
    <>
      <PageHero fx="meteors" eyebrow="Sky tonight" title="Your observing guide" description="Everything here is computed on your device from the date — no API, no clouds, always available." />

      <Section className="!pt-0">
        <SkyTonight />
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Calendar" title="Meteor showers this year" description="Peak dates are approximate (±1 day). ZHR is the ideal-sky hourly rate — expect a third of that from a typical dark site." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METEOR_SHOWERS.map((s) => (
            <Card key={s.name} className="flex gap-4 p-5">
              <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white/[0.04] py-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-star-400">{MONTHS[s.month - 1]}</span>
                <span className="font-display text-2xl font-semibold text-white">{s.day}</span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{s.name}</h3>
                  <Badge tone={s.zhr >= 100 ? "gold" : "muted"}>ZHR {s.zhr}</Badge>
                </div>
                <p className="mt-1 text-xs text-fg-subtle">Parent: {s.parent}</p>
                <p className="mt-2 text-sm text-fg-muted">{s.note}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Seasons" title="What to look for, season by season" description="Northern-hemisphere evening sky. Constellations rise about two hours earlier each month." />
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(SEASONAL_SKY).map(([key, s]) => (
            <Card key={key} className="p-6">
              <p className="eyebrow">{key}</p>
              <p className="mt-2 text-sm text-fg-subtle">{s.months.map((m) => MONTHS[m - 1]).join(" · ")}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-fg-subtle">Constellations</p>
              <p className="mt-1 text-white">{s.constellations.join(", ")}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-fg-subtle">Highlights</p>
              <ul className="mt-1 grid gap-1 text-sm text-fg-muted">
                {s.highlights.map((h) => <li key={h}>✦ {h}</li>)}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-sm italic text-fg-muted">{s.tip}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Field notes" title="Six things that make a night out better" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map(([title, text], i) => (
            <Card key={title} className="p-5">
              <p className="font-mono text-xs text-star-400">0{i + 1}</p>
              <h3 className="mt-2 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
