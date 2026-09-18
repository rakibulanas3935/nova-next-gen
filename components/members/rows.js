"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";
import { deleteProject, deleteGallery } from "@/lib/actions/community";
import { formatDate } from "@/lib/format";

/** Small confirm-then-run button used across member and admin lists. */
export function ConfirmButton({ action, confirm = "Are you sure?", children, variant = "danger", size = "sm", onDone, ...props }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const go = async () => {
    if (!window.confirm(confirm)) return;
    setLoading(true);
    const res = await action();
    setLoading(false);
    res.ok ? toast.success(res.message) : toast.error(res.message);
    if (res.ok) {
      onDone?.();
      router.refresh();
    }
  };
  return (
    <Button variant={variant} size={size} loading={loading} onClick={go} {...props}>
      {children}
    </Button>
  );
}

export function MemberProjectRow({ project }) {
  return (
    <Card className="flex items-center gap-4 p-3 pr-4">
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
        <SmartImage src={project.projectImage} alt="" sizes="96px" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-white">{project.title}</p>
          <Badge tone={project.isApproved ? "green" : "gold"}>{project.isApproved ? "Live" : "Pending review"}</Badge>
        </div>
        <p className="mt-0.5 text-xs text-fg-subtle">Submitted {formatDate(project.createdAt)}</p>
      </div>
      <div className="flex shrink-0 gap-1.5">
        {project.isApproved && (
          <Button href={`/projects/${project.slug || project._id}`} variant="ghost" size="icon" title="View"><ExternalLink className="h-4 w-4" /></Button>
        )}
        <Button href={`/members/projects/${project._id}/edit`} variant="ghost" size="icon" title="Edit"><Pencil className="h-4 w-4" /></Button>
        <ConfirmButton action={() => deleteProject(project._id)} confirm="Delete this project? This cannot be undone." variant="ghost" size="icon" title="Delete"><Trash2 className="h-4 w-4 text-red-300" /></ConfirmButton>
      </div>
    </Card>
  );
}

export function MemberGalleryRow({ gallery }) {
  return (
    <Card className="flex items-center gap-4 p-3 pr-4">
      <div className="flex shrink-0 -space-x-3">
        {gallery.images.slice(0, 3).map((url, i) => (
          <div key={url + i} className="relative h-14 w-14 overflow-hidden rounded-lg border-2 border-space-900">
            <SmartImage src={url} alt="" sizes="56px" />
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-white">{gallery.caption || `${gallery.images.length} photo${gallery.images.length > 1 ? "s" : ""}`}</p>
          <Badge tone={gallery.isApproved ? "green" : "gold"}>{gallery.isApproved ? "Live" : "Pending review"}</Badge>
        </div>
        <p className="mt-0.5 text-xs text-fg-subtle">{gallery.images.length} photo{gallery.images.length > 1 ? "s" : ""} · {formatDate(gallery.createdAt)}</p>
      </div>
      <ConfirmButton action={() => deleteGallery(gallery._id)} confirm="Delete these photos?" variant="ghost" size="icon" title="Delete"><Trash2 className="h-4 w-4 text-red-300" /></ConfirmButton>
    </Card>
  );
}
