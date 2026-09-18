import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { STATS } from "@/lib/content";
import TwinkleField from "@/components/fx/TwinkleField";
import SolarSystem from "./SolarSystem";
import { HeroReveal } from "@/components/ui/motion";

export default function Hero({ nextEvent }) {
  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-24">
      {/* Layer 0: faint galaxy photo for texture */}
      <div className="absolute inset-0 -z-20 bg-[url('/gallery/sky-space-dark-galaxy.jpg')] bg-cover bg-center opacity-25" aria-hidden />
      {/* Layer 1: twinkling stars + occasional shooting star */}
      <TwinkleField className="absolute inset-0 -z-10 h-full w-full" density={1.2} shooting />
      {/* Layer 2: vignette + nebula colour */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_35%,transparent_20%,rgba(4,6,13,0.75)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_80%_20%,rgba(139,116,245,0.18),transparent),radial-gradient(40%_40%_at_15%_80%,rgba(94,177,255,0.14),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-space-950" aria-hidden />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <HeroReveal delay={0.05}>
            {nextEvent ? (
              <Link
                href={`/events/${nextEvent.slug || nextEvent._id}`}
                className="group mb-7 inline-flex items-center gap-2 rounded-full border border-star-500/30 bg-star-500/10 py-1.5 pl-1.5 pr-3 text-xs text-star-300 backdrop-blur transition-colors hover:bg-star-500/20"
              >
                <span className="rounded-full bg-star-500 px-2 py-0.5 font-semibold text-space-950">Next</span>
                <span className="max-w-[16rem] truncate sm:max-w-none">{nextEvent.title}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <p className="eyebrow mb-7 inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Student-led astronomy club</p>
            )}
          </HeroReveal>

          <HeroReveal delay={0.15}>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Look up.
              <br />
              <span className="text-gradient">Then look deeper.</span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
              Telescope nights, AI-astrophysics workshops, talks with real researchers — and a community that's as curious as you are.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.42}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/join" size="lg">Join the club</Button>
              <Button href="/events" size="lg" variant="secondary">Upcoming events</Button>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.6}>
            <dl className="mt-14 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-space-950/40 px-4 py-3 backdrop-blur">
                  <dt className="text-[11px] text-fg-subtle">{s.label}</dt>
                  <dd className="mt-0.5 font-display text-2xl font-semibold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </HeroReveal>
        </div>

        <HeroReveal delay={0.35} className="relative hidden lg:block">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(245,185,66,0.12),transparent_70%)]" />
          <SolarSystem className="mx-auto w-full max-w-[34rem] drop-shadow-[0_0_40px_rgba(245,185,66,0.15)]" />
          <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-fg-subtle">Orbits to scale in time, not space</p>
        </HeroReveal>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-fg-subtle sm:block" aria-hidden>
        <div className="h-9 w-5 rounded-full border border-line-strong p-1">
          <div className="h-2 w-full rounded-full bg-star-500/70" />
        </div>
      </div>
    </section>
  );
}
