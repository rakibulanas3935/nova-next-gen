import Link from "next/link";
import clsx from "clsx";
import { apiGet } from "@/lib/api";
import { PageHero, Section } from "@/components/ui/primitives";
import { EventList } from "@/components/content/lists";
import Pagination from "@/components/ui/Pagination";

export const revalidate = 300;

export const metadata = {
  title: "Events",
  description: "Telescope nights, workshops, webinars and talks from Deep Sky Society. Most events are free and open to everyone.",
};

const SCOPES = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past events" },
];

export default async function EventsPage({ searchParams }) {
  const sp = await searchParams;
  const scope = sp.scope === "past" ? "past" : "upcoming";
  const page = Math.max(1, parseInt(sp.page, 10) || 1);
  const path = `/events?scope=${scope}&page=${page}&limit=12`;
  const events = await apiGet(path, { tags: ["events"] });

  return (
    <>
      <PageHero fx="orbits" eyebrow="Events" title="Nights under the stars" description="Observing sessions, hands-on workshops and conversations with researchers. Members-only events show a lock — log in to get the link." />

      <Section className="!pt-0">
        <div className="mb-8 flex gap-1 rounded-xl border border-line bg-white/[0.03] p-1 sm:w-fit">
          {SCOPES.map((s) => (
            <Link
              key={s.key}
              href={`/events?scope=${s.key}`}
              className={clsx("flex-1 rounded-lg px-4 py-2 text-center text-sm transition-colors sm:flex-none", scope === s.key ? "bg-star-500 text-space-950 font-semibold" : "text-fg-muted hover:text-white")}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <EventList
          key={path}
          initial={events}
          path={path}
          cacheKey={`events:${scope}:${page}`}
          emptyText={scope === "upcoming" ? "Nothing scheduled right now — check back soon or browse past events." : "No past events recorded yet."}
        />
        <Pagination pagination={events?.pagination} basePath="/events" params={{ scope }} />
      </Section>
    </>
  );
}
