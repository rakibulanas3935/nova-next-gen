import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { STATS } from "@/lib/content";

export default function Hero({ nextEvent }) {
  return (
    <section className="relative isolate flex min-h-[92dvh] items-center overflow-hidden pt-24">
      {/* Background: poster image + optional lazy video on large screens */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <img
            src="/gallery/sky-space-dark-galaxy.jpg"
            alt=""
            className="h-full w-full object-cover opacity-60"
            fetchPriority="high"
          />
        </picture>
        <video
          className="absolute inset-0 hidden h-full w-full object-cover opacity-50 motion-reduce:hidden lg:block"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/gallery/sky-space-dark-galaxy.jpg"
        >
          <source src="/deep_sky_2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/70 via-space-950/40 to-space-950" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,transparent,rgba(4,6,13,0.6))]" />
      </div>

      <div className="container-x relative">
        <div className="max-w-3xl animate-fade-up">
          {nextEvent ? (
            <Link
              href={`/events/${nextEvent.slug || nextEvent._id}`}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-star-500/30 bg-star-500/10 py-1.5 pl-1.5 pr-3 text-xs text-star-300 transition-colors hover:bg-star-500/20"
            >
              <span className="rounded-full bg-star-500 px-2 py-0.5 font-semibold text-space-950">Next</span>
              <span className="truncate max-w-[16rem] sm:max-w-none">{nextEvent.title}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <p className="eyebrow mb-6 inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Student-led astronomy club</p>
          )}

          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Look up. <span className="text-gradient">Then look deeper.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            Telescope nights, AI-astrophysics workshops, talks with real researchers — and a community that's as curious as you are.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/join" size="lg">Join the club</Button>
            <Button href="/events" size="lg" variant="secondary">Upcoming events</Button>
          </div>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl px-4 py-4">
              <dt className="text-xs text-fg-subtle">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-fg-subtle sm:block" aria-hidden>
        <div className="h-9 w-5 rounded-full border border-line-strong p-1">
          <div className="h-2 w-full rounded-full bg-star-500/70" />
        </div>
      </div>
    </section>
  );
}
