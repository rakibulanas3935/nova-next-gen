import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Badge, Card } from "@/components/ui/primitives";
import SmartImage from "@/components/ui/SmartImage";
import { PageHeader, Tabs } from "@/components/dashboard/ui";
import { GalleryReview } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Gallery" };

export default async function GalleryAdminPage({ searchParams }) {
  const sp = await searchParams;
  const status = ["pending", "approved"].includes(sp.status) ? sp.status : "";
  const res = await apiGet("/gallery/mine", { auth: true }); // admin → all
  const all = res?.data?.galleries || [];
  const pending = all.filter((g) => !g.isApproved).length;
  const list = status === "pending" ? all.filter((g) => !g.isApproved) : status === "approved" ? all.filter((g) => g.isApproved) : all;

  return (
    <>
      <PageHeader title="Gallery" description="Approve member photos. Approved sets appear on the public gallery." action={{ href: "/members/photos/new", label: "+ Upload photos" }} />
      <Tabs basePath="/dashboard/gallery" current={status} tabs={[{ key: "", label: "All", count: all.length }, { key: "pending", label: "Pending", count: pending }, { key: "approved", label: "Live", count: all.length - pending }]} />

      {list.length === 0 ? (
        <Card className="p-10 text-center text-sm text-fg-muted">Nothing here.</Card>
      ) : (
        <div className="grid gap-4">
          {list.map((g) => (
            <Card key={g._id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-white">{g.caption || `${g.images.length} photo${g.images.length > 1 ? "s" : ""}`}</p>
                    <Badge tone={g.isApproved ? "green" : "gold"}>{g.isApproved ? "Live" : "Pending"}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-fg-subtle">by {g.createdBy?.name || "—"} · {formatDate(g.createdAt)}</p>
                </div>
                <GalleryReview gallery={g} />
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto scroll-thin pb-1">
                {g.images.map((url, i) => (
                  <a key={url + i} href={url} target="_blank" rel="noopener noreferrer" className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-line">
                    <SmartImage src={url} alt="" sizes="160px" />
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
