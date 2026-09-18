import Link from "next/link";
import { Users, FolderKanban, Camera, ArrowRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import { Card } from "@/components/ui/primitives";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import GrowthChart from "@/components/dashboard/GrowthChart";

export default async function DashboardHome() {
  const res = await apiGet("/dashboard", { auth: true });
  const d = res?.data;
  const t = d?.totals || {};

  const queue = [
    { label: "Membership requests", count: t.pendingMembers, href: "/dashboard/members?status=pending", Icon: Users },
    { label: "Projects awaiting review", count: t.pendingProjects, href: "/dashboard/projects?status=pending", Icon: FolderKanban },
    { label: "Photos awaiting review", count: t.pendingGalleries, href: "/dashboard/gallery?status=pending", Icon: Camera },
  ].filter((q) => q.count > 0);

  return (
    <>
      <PageHeader title="Overview" description={d ? "Here's what's happening across the society." : "Couldn't load stats — the API may be waking up. Refresh in a moment."} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved members" value={t.totalMembers} hint={t.pendingMembers ? `${t.pendingMembers} pending` : "No pending requests"} href="/dashboard/members" />
        <StatCard label="Live projects" value={t.approvedProjects} hint={t.pendingProjects ? `${t.pendingProjects} to review` : "All reviewed"} tone="sky" href="/dashboard/projects" />
        <StatCard label="Blog posts" value={t.totalBlogs} tone="nebula" href="/dashboard/blog" />
        <StatCard label="Upcoming events" value={t.upcomingEvents} hint={`${t.unreadMessages ?? 0} messages this week`} tone="green" href="/dashboard/events" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <p className="eyebrow mb-4">Member growth · last 6 months</p>
          <GrowthChart data={d?.memberGrowth || []} />
        </Card>

        <div className="space-y-6">
          {queue.length > 0 && (
            <Card className="border-star-500/30 p-5">
              <p className="eyebrow mb-3">Needs your attention</p>
              <ul className="divide-y divide-line">
                {queue.map(({ label, count, href, Icon }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center gap-3 py-3 text-sm hover:text-star-300">
                      <Icon className="h-4 w-4 text-star-400" />
                      <span className="flex-1">{label}</span>
                      <span className="rounded-full bg-star-500/20 px-2 text-xs font-semibold text-star-300">{count}</span>
                      <ArrowRight className="h-4 w-4 text-fg-subtle" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="p-5">
            <p className="eyebrow mb-3">Recent activity</p>
            {d?.recentActivity?.length ? (
              <ul className="space-y-3 text-sm">
                {d.recentActivity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-fg">{a.action}{a.title ? <span className="text-fg-muted"> — {a.title}</span> : a.who ? <span className="text-fg-muted"> — {a.who}</span> : null}</p>
                      <p className="text-xs text-fg-subtle">{timeAgo(a.time)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-fg-muted">No activity yet.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
