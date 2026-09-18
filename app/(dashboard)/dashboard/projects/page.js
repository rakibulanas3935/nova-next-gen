import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import SmartImage from "@/components/ui/SmartImage";
import { PageHeader, Table, Tabs } from "@/components/dashboard/ui";
import { ProjectReview } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Projects" };

export default async function ProjectsAdminPage({ searchParams }) {
  const sp = await searchParams;
  const status = ["pending", "approved"].includes(sp.status) ? sp.status : "";
  const res = await apiGet("/projects/mine", { auth: true }); // admin → all projects
  const all = res?.data?.projects || [];
  const pending = all.filter((p) => !p.isApproved).length;
  const list = status === "pending" ? all.filter((p) => !p.isApproved) : status === "approved" ? all.filter((p) => p.isApproved) : all;

  return (
    <>
      <PageHeader title="Projects" description="Review member submissions and feature the best ones." action={{ href: "/members/projects/new", label: "+ New project" }} />
      <Tabs basePath="/dashboard/projects" current={status} tabs={[{ key: "", label: "All", count: all.length }, { key: "pending", label: "Pending", count: pending }, { key: "approved", label: "Live", count: all.length - pending }]} />
      <Table columns={["Project", "By", "Status", "Submitted", ""]} empty={list.length ? null : "Nothing here."}>
        {list.map((p) => (
          <tr key={p._id} className="hover:bg-white/[0.02]">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md"><SmartImage src={p.projectImage} alt="" sizes="64px" /></div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{p.title}</p>
                  <p className="truncate text-xs text-fg-subtle">{p.excerpt}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-fg-muted">{p.createdBy?.name || "—"}</td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                <Badge tone={p.isApproved ? "green" : "gold"}>{p.isApproved ? "Live" : "Pending"}</Badge>
                {p.isFeatured && <Badge tone="gold">★</Badge>}
              </div>
            </td>
            <td className="px-4 py-3 text-fg-muted">{formatDate(p.createdAt)}</td>
            <td className="px-4 py-3"><ProjectReview project={p} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
