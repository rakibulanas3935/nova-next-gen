import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import { PageHeader, Table } from "@/components/dashboard/ui";
import { LearnActions } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Learn" };
const TONE = { beginner: "green", intermediate: "sky", advanced: "nebula" };

export default async function LearnAdminPage() {
  const res = await apiGet("/learn", { auth: true });
  const lessons = res?.data?.learns || [];
  return (
    <>
      <PageHeader title="Learn" description="Workshop notes and lessons. The six static learning tracks live in code." action={{ href: "/dashboard/learn/new", label: "+ New lesson" }} />
      <Table columns={["Lesson", "Level", "Category", "Order", "Updated", ""]} empty={lessons.length ? null : "No lessons yet."}>
        {lessons.map((l) => (
          <tr key={l._id} className="hover:bg-white/[0.02]">
            <td className="px-4 py-3 font-medium text-white">{l.title}</td>
            <td className="px-4 py-3"><Badge tone={TONE[l.level] || "muted"}>{l.level}</Badge></td>
            <td className="px-4 py-3 text-fg-muted">{l.category}</td>
            <td className="px-4 py-3 text-fg-muted">{l.order}</td>
            <td className="px-4 py-3 text-fg-muted">{formatDate(l.updatedAt)}</td>
            <td className="px-4 py-3"><LearnActions lesson={l} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
