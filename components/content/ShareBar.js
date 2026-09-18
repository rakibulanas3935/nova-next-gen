"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 flex items-center justify-between border-t border-line pt-6 text-sm text-fg-muted">
      <span>Enjoyed this? Pass it on.</span>
      <button onClick={share} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 hover:bg-white/5 ring-focus">
        {copied ? <Check className="h-4 w-4 text-emerald-300" /> : typeof navigator !== "undefined" && navigator.share ? <Share2 className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Link copied" : "Share"}
      </button>
    </div>
  );
}
