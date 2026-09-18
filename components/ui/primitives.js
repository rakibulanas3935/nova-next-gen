import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Telescope } from "lucide-react";
import { Reveal } from "./motion";
import PageFx from "@/components/fx/PageFx";
import VideoBackdrop from "@/components/fx/VideoBackdrop";

export function Container({ className, children }) {
  return <div className={clsx("container-x", className)}>{children}</div>;
}

export function Card({ className, as: Tag = "div", hover = false, children, ...props }) {
  return (
    <Tag
      className={clsx(
        "glass rounded-2xl",
        hover && "transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

const badgeTones = {
  gold: "bg-star-500/15 text-star-300 border-star-500/30",
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  nebula: "bg-nebula-500/15 text-nebula-400 border-nebula-500/30",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  red: "bg-red-500/15 text-red-300 border-red-500/30",
  muted: "bg-white/5 text-fg-muted border-line",
};

export function Badge({ tone = "muted", className, children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Section header: eyebrow + title + optional description + optional link. */
export function SectionHeader({ eyebrow, title, description, href, linkLabel = "View all", align = "left", className }) {
  return (
    <div className={clsx("mb-8 flex flex-col gap-4 sm:mb-10", align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-fg-muted leading-relaxed">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-300 ring-focus rounded">
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function Section({ className, children, reveal = true, space = true, ...props }) {
  return (
    <section className={clsx("relative py-16 sm:py-20 lg:py-24", space && "section-space", className)} {...props}>
      {space && <Dust count={8} />}
      <Container className="relative">{reveal ? <Reveal>{children}</Reveal> : children}</Container>
    </section>
  );
}

/** Top-of-page hero used by every inner page. */
export function PageHero({ eyebrow, title, description, children, className, fx = "twinkle", video }) {
  return (
    <div className={clsx("relative isolate pt-32 pb-14 sm:pt-40 sm:pb-20", video && "sm:pb-28", className)}>
      {video && <VideoBackdrop name={video} className="-z-20" opacity={0.5} />}
      <PageFx variant={fx} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.10),transparent_70%)]" />
      <Container className="relative">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl font-semibold leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </div>
  );
}

export function EmptyState({ icon: Icon = Telescope, title, text, action }) {
  return (
    <div className="glass flex flex-col items-center rounded-2xl px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-star-500/10 text-star-400">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm text-fg-muted">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={clsx("skeleton", className)} aria-hidden />;
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-4">
          <Skeleton className="aspect-[16/10] w-full" />
          <Skeleton className="mt-4 h-4 w-1/3" />
          <Skeleton className="mt-3 h-6 w-4/5" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

/** Small notice for "showing cached data" / "API waking up" states. */
export function ApiNotice({ status, onRetry }) {
  if (status === "fresh" || status === "loading") return null;
  const cached = status === "cached";
  return (
    <div className={clsx("mb-6 flex flex-wrap items-center gap-3 rounded-xl border px-4 py-2.5 text-sm", cached ? "border-star-500/25 bg-star-500/5 text-star-300" : "border-red-500/25 bg-red-500/5 text-red-300")}>
      <span className="relative flex h-2 w-2">
        <span className={clsx("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", cached ? "bg-star-400" : "bg-red-400")} />
        <span className={clsx("relative inline-flex h-2 w-2 rounded-full", cached ? "bg-star-400" : "bg-red-400")} />
      </span>
      {cached ? "Showing saved data while our telescope warms up…" : "We couldn't reach the server right now."}
      {onRetry && (
        <button onClick={onRetry} className="ml-auto underline-offset-2 hover:underline ring-focus rounded">
          Retry
        </button>
      )}
    </div>
  );
}

/** Animated aurora line between sections. */
export function AuroraLine({ className }) {
  return <div className={clsx("aurora-line container-x", className)} aria-hidden />;
}

/** Slowly rising dust/asteroid particles for a section background. */
export function Dust({ count = 14, className }) {
  const items = Array.from({ length: count }, (_, i) => {
    const size = 2 + ((i * 7) % 5);
    return { left: `${(i * 61) % 100}%`, size, dur: `${18 + ((i * 13) % 20)}s`, delay: `-${(i * 5) % 20}s`, top: `${60 + ((i * 17) % 50)}%` };
  });
  return (
    <div className={clsx("dust", className)} aria-hidden>
      {items.map((d, i) => (
        <i key={i} style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }} />
      ))}
    </div>
  );
}
