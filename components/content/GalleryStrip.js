"use client";

import Link from "next/link";
import { normalizeImages } from "@/lib/format";
import { useCachedResource } from "@/lib/client-cache";
import SmartImage from "@/components/ui/SmartImage";
import { Skeleton } from "@/components/ui/primitives";

/** Horizontal scroll strip of the latest approved gallery photos. */
export default function GalleryStrip({ initial }) {
  const { data } = useCachedResource("home:gallery", "/gallery/approved?limit=8", initial, { select: (j) => normalizeImages(j?.data?.images) });

  if (!data) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-44 w-64 shrink-0" />)}
      </div>
    );
  }
  if (!data.length) return null;

  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scroll-thin sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {data.map((img, i) => (
        <Link
          key={img.id}
          href="/gallery"
          className="group relative h-48 w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-line sm:h-56 sm:w-80"
        >
          <SmartImage src={img.url} alt={img.caption || "Gallery photo"} sizes="320px" className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-950/80 to-transparent p-3 text-xs text-fg-muted">
            {img.caption || `© ${img.credit}`}
          </div>
        </Link>
      ))}
    </div>
  );
}
