import { apiGet } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import { PageHeader, Tabs, Table } from "@/components/dashboard/ui";
import { MemberRowActions, CreateUserForm } from "@/components/dashboard/MemberActions";

export const metadata = { title: "Members" };

const STATUS_TONE = { pending: "gold", approved: "green", rejected: "red" };

export default async function MembersAdminPage({ searchParams }) {
  const sp = await searchParams;
  const status = ["pending", "approved", "rejected"].includes(sp.status) ? sp.status : "";
  const [me, all] = await Promise.all([getCurrentUser(), apiGet("/users", { auth: true })]);
  const users = all?.data?.users || [];
  const counts = users.reduce((acc, u) => ({ ...acc, [u.status]: (acc[u.status] || 0) + 1 }), {});
  const list = status ? users.filter((u) => u.status === status) : users;

  return (
    <>
      <PageHeader title="Members" description="Approve applications, manage roles.">
        <CreateUserForm />
      </PageHeader>

      <Tabs
        basePath="/dashboard/members"
        current={status}
        tabs={[
          { key: "", label: "All", count: users.length },
          { key: "pending", label: "Pending", count: counts.pending || 0 },
          { key: "approved", label: "Approved", count: counts.approved || 0 },
          { key: "rejected", label: "Declined", count: counts.rejected || 0 },
        ]}
      />

      <Table columns={["Member", "Email", "Status", "Role", "Joined", ""]} empty={list.length ? null : all ? "Nobody here." : "Couldn't load members."}>
        {list.map((u) => (
          <tr key={u._id} className="hover:bg-white/[0.02]">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300">
                  {u.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={u.photo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    u.name?.[0]
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{u.name}</p>
                  <p className="truncate text-xs text-fg-subtle">@{u.userName}{u.interests ? ` · ${u.interests}` : ""}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-fg-muted">{u.email}</td>
            <td className="px-4 py-3"><Badge tone={STATUS_TONE[u.status] || "muted"}>{u.status}</Badge></td>
            <td className="px-4 py-3"><Badge tone={u.role === "admin" ? "nebula" : "muted"}>{u.role}</Badge></td>
            <td className="px-4 py-3 text-fg-muted">{formatDate(u.createdAt)}</td>
            <td className="px-4 py-3"><MemberRowActions user={u} me={me} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
