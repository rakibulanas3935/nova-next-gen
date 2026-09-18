"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, ExternalLink, Check, X, Star } from "lucide-react";
import Button from "@/components/ui/Button";

function useRun() {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const run = async (key, fn, confirm) => {
    if (confirm && !window.confirm(confirm)) return;
    setBusy(key);
    const res = await fn();
    setBusy("");
    res.ok ? toast.success(res.message) : toast.error(res.message);
    if (res.ok) router.refresh();
  };
  return { busy, run };
}

/** Edit / view / delete trio for blog, events, learn. */
export function EditDeleteActions({ editHref, viewHref, onDelete, confirm = "Delete this item? This cannot be undone." }) {
  const { busy, run } = useRun();
  return (
    <div className="flex justify-end gap-1">
      {viewHref && <Button href={viewHref} target="_blank" variant="ghost" size="icon" title="View"><ExternalLink className="h-4 w-4" /></Button>}
      <Button href={editHref} variant="ghost" size="icon" title="Edit"><Pencil className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" title="Delete" loading={busy === "del"} onClick={() => run("del", onDelete, confirm)}><Trash2 className="h-4 w-4 text-red-300" /></Button>
    </div>
  );
}

/** Approve / reject / feature / delete for projects and galleries. */
export function ReviewActions({ approved, featured, onApprove, onReject, onFeature, onDelete, editHref, viewHref }) {
  const { busy, run } = useRun();
  return (
    <div className="flex flex-wrap justify-end gap-1.5">
      {!approved && (
        <>
          <Button size="sm" loading={busy === "ok"} onClick={() => run("ok", onApprove)}><Check className="h-4 w-4" /> Approve</Button>
          <Button size="sm" variant="danger" loading={busy === "no"} onClick={() => run("no", onReject, "Reject and remove this submission?")}><X className="h-4 w-4" /> Reject</Button>
        </>
      )}
      {approved && onFeature && (
        <Button size="sm" variant={featured ? "primary" : "secondary"} loading={busy === "feat"} onClick={() => run("feat", () => onFeature(!featured))} title={featured ? "Unfeature" : "Feature on home"}>
          <Star className="h-4 w-4" /> {featured ? "Featured" : "Feature"}
        </Button>
      )}
      {viewHref && approved && <Button href={viewHref} target="_blank" variant="ghost" size="icon" title="View"><ExternalLink className="h-4 w-4" /></Button>}
      {editHref && <Button href={editHref} variant="ghost" size="icon" title="Edit"><Pencil className="h-4 w-4" /></Button>}
      {approved && onDelete && (
        <Button variant="ghost" size="icon" title="Delete" loading={busy === "del"} onClick={() => run("del", onDelete, "Delete permanently?")}><Trash2 className="h-4 w-4 text-red-300" /></Button>
      )}
    </div>
  );
}
