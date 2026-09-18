import { apiGet } from "@/lib/api";
import { formatDateTime, isPast, EVENT_TYPES } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import { PageHeader, Table, Tabs } from "@/components/dashboard/ui";
import { EventActions } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Events" };

export default async function EventsAdminPage({ searchParams }) {
  const sp = await searchParams;
  const scope = sp.scope === "past" ? "past" : "upcoming";
  const res = await apiGet(`/events?scope=${scope}&limit=50`, { auth: true });
  const events = res?.data?.events || [];
  return (
    <>
      <PageHeader title="Events" description="Schedule sessions, workshops and talks." action={{ href: "/dashboard/events/new", label: "+ New event" }} />
      <Tabs basePath="/dashboard/events" param="scope" current={scope} tabs={[{ key: "upcoming", label: "Upcoming" }, { key: "past", label: "Past" }]} />
      <Table columns={["Event", "When", "Type", "Access", ""]} empty={events.length ? null : "Nothing here."}>
        {events.map((e) => (
          <tr key={e._id} className="hover:bg-white/[0.02]">
            <td className="px-4 py-3">
              <p className="font-medium text-white">{e.title}</p>
              <p className="text-xs text-fg-subtle">{e.location || (e.meetLink ? "Online" : "—")}</p>
            </td>
            <td className="px-4 py-3 text-fg-muted">{formatDateTime(e.eventTime)}</td>
            <td className="px-4 py-3"><Badge tone={isPast(e.eventTime) ? "muted" : "gold"}>{EVENT_TYPES[e.type]?.label || "Event"}</Badge></td>
            <td className="px-4 py-3"><Badge tone={e.membersOnly ? "nebula" : "muted"}>{e.membersOnly ? "Members" : "Public"}</Badge></td>
            <td className="px-4 py-3"><EventActions event={e} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
