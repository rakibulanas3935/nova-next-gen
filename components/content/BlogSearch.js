"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/form";

export default function BlogSearch({ q = "", tag = "" }) {
  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("q")?.toString().trim();
    router.push(value ? `/blog?q=${encodeURIComponent(value)}` : "/blog");
  };

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <form onSubmit={submit} className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
        <Input name="q" defaultValue={q} placeholder="Search posts…" className="pl-10" aria-label="Search posts" />
      </form>
      {tag && (
        <Link href="/blog" className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-300 hover:bg-sky-500/20">
          #{tag} <X className="h-3 w-3" />
        </Link>
      )}
      {q && (
        <Link href="/blog" className="text-sm text-fg-muted hover:text-white">Clear search</Link>
      )}
    </div>
  );
}
