import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Server-rendered pager driven by ?page= so lists stay crawlable. */
export default function Pagination({ pagination, basePath, params = {} }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages } = pagination;
  const href = (p) => {
    const q = new URLSearchParams({ ...params, page: String(p) });
    return `${basePath}?${q}`;
  };
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages);

  return (
    <nav className="mt-12 flex items-center justify-center gap-1" aria-label="Pagination">
      <Link href={href(Math.max(1, page - 1))} aria-disabled={page === 1} className={clsx("flex h-10 w-10 items-center justify-center rounded-lg border border-line", page === 1 ? "pointer-events-none opacity-40" : "hover:bg-white/5")}>
        <ChevronLeft className="h-4 w-4" />
      </Link>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center">
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-fg-subtle">…</span>}
          <Link href={href(p)} aria-current={p === page ? "page" : undefined} className={clsx("flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm", p === page ? "border-star-500/50 bg-star-500/15 text-star-300" : "border-line hover:bg-white/5")}>
            {p}
          </Link>
        </span>
      ))}
      <Link href={href(Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={clsx("flex h-10 w-10 items-center justify-center rounded-lg border border-line", page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-white/5")}>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
