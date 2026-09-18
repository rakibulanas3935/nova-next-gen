"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useCachedResource, clientGet } from "@/lib/client-cache";
import SmartImage from "@/components/ui/SmartImage";
import { ApiNotice, EmptyState, Skeleton } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/format";

function Lightbox({ images, index, onClose, onStep }) {
  const img = images[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-space-950/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={onClose}>
      <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onStep(-1); }} className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex" aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onStep(1); }} className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex" aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url} alt={img.caption || "Gallery photo"} className="max-h-[80dvh] w-auto rounded-xl object-contain" />
        <figcaption className="mt-3 flex items-center justify-between text-sm text-fg-muted">
          <span>{img.caption || "Untitled"}</span>
          <span className="text-xs">© {img.credit} · {formatDate(img.createdAt)} · {index + 1}/{images.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function GalleryGrid({ initial }) {
  const { data, status, refresh } = useCachedResource("gallery:1", "/gallery/approved?limit=24", initial, { select: (j) => j });
  const [extra, setExtra] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [open, setOpen] = useState(null);

  const images = [...(data?.data?.images || []), ...extra];
  const totalPages = data?.pagination?.totalPages || 1;

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = page + 1;
      const json = await clientGet(`/gallery/approved?limit=24&page=${next}`, { retries: 1 });
      setExtra((e) => [...e, ...(json?.data?.images || [])]);
      setPage(next);
    } finally {
      setLoadingMore(false);
    }
  };

  const step = useCallback((d) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length]);
  const close = useCallback(() => setOpen(null), []);

  if (!data) {
    if (status === "error") return <><ApiNotice status={status} onRetry={refresh} /><EmptyState icon={Camera} title="Gallery unavailable" /></>;
    return (
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className={i % 3 === 0 ? "h-72" : "h-48"} />)}
      </div>
    );
  }
  if (!images.length) return <EmptyState icon={Camera} title="No photos yet" text="Members can upload astrophotography from the members area — approved shots appear here." />;

  return (
    <>
      <ApiNotice status={status} onRetry={refresh} />
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-line ring-focus"
            style={{ aspectRatio: i % 5 === 0 ? "3/4" : i % 3 === 0 ? "1/1" : "4/3" }}
          >
            <SmartImage src={img.url} alt={img.caption || "Gallery photo"} sizes="(max-width: 640px) 50vw, 25vw" className="transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-space-950/90 to-transparent p-3 text-left text-xs text-fg transition-transform group-hover:translate-y-0">
              {img.caption || `© ${img.credit}`}
            </div>
          </button>
        ))}
      </div>
      {page < totalPages && (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={loadMore} loading={loadingMore}>Load more</Button>
        </div>
      )}
      {open !== null && <Lightbox images={images} index={open} onClose={close} onStep={step} />}
    </>
  );
}
