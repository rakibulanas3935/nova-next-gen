"use client";

import { Newspaper, CalendarDays, FolderKanban } from "lucide-react";
import { useCachedResource } from "@/lib/client-cache";
import { ApiNotice, CardSkeleton, EmptyState } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import { BlogCard, EventCard, ProjectCard } from "./cards";

/*
 * Each list receives `initial` (server-fetched, may be null when the API was
 * asleep) and falls back to localStorage + a client retry. The server-rendered
 * HTML still contains the data when it was available, so SEO is unaffected.
 */

export function BlogList({ initial, path = "/blogs?limit=12", cacheKey = "blogs", featuredFirst = false, columns = 3, max = Infinity }) {
  const { data, status, refresh } = useCachedResource(cacheKey, path, initial, { select: (j) => (j?.data?.blogs || []).slice(0, max) });
  if (!data) return status === "error" ? <><ApiNotice status={status} onRetry={refresh} /><EmptyState icon={Newspaper} title="No posts yet" text="Check back soon — we're writing." /></> : <CardSkeleton count={columns} />;
  if (!data.length) return <EmptyState icon={Newspaper} title="No posts yet" text="Check back soon — we're writing." />;

  const [first, ...rest] = data;
  return (
    <>
      <ApiNotice status={status} onRetry={refresh} />
      {featuredFirst && (
        <div className="mb-6">
          <BlogCard blog={first} featured priority />
        </div>
      )}
      <div className={columns === 2 ? "grid gap-6 sm:grid-cols-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
        {(featuredFirst ? rest : data).map((b) => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
    </>
  );
}

export function EventList({ initial, path = "/events?limit=12", cacheKey = "events", compact = false, max = Infinity, emptyText = "No events scheduled yet. Follow us to hear about the next one." }) {
  const { data, status, refresh } = useCachedResource(cacheKey, path, initial, { select: (j) => (j?.data?.events || []).slice(0, max) });
  if (!data) return status === "error" ? <><ApiNotice status={status} onRetry={refresh} /><EmptyState icon={CalendarDays} title="No events" text={emptyText} /></> : <CardSkeleton count={compact ? 2 : 3} />;
  if (!data.length) return <EmptyState icon={CalendarDays} title="No events" text={emptyText} />;

  return (
    <>
      <ApiNotice status={status} onRetry={refresh} />
      <div className="grid gap-5 md:grid-cols-2">
        {data.map((e) => (
          <EventCard key={e._id} event={e} compact={compact} />
        ))}
      </div>
    </>
  );
}

export function ProjectList({ initial, path = "/projects?limit=12", cacheKey = "projects", max = Infinity }) {
  const { data, status, refresh } = useCachedResource(cacheKey, path, initial, { select: (j) => (j?.data?.projects || []).slice(0, max) });
  if (!data) return status === "error" ? <><ApiNotice status={status} onRetry={refresh} /><EmptyState icon={FolderKanban} title="No projects yet" /></> : <CardSkeleton />;
  if (!data.length) return <EmptyState icon={FolderKanban} title="No projects yet" text="Members can submit their own — log in to share what you're building." action={<Button href="/members" variant="secondary" size="sm">Submit a project</Button>} />;

  return (
    <>
      <ApiNotice status={status} onRetry={refresh} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </>
  );
}
