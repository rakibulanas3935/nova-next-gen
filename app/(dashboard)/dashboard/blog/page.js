import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import { PageHeader, Table } from "@/components/dashboard/ui";
import { BlogActions } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Blog" };

export default async function BlogAdminPage() {
  const res = await apiGet("/blogs?all=1&limit=50", { auth: true });
  const blogs = res?.data?.blogs || [];
  return (
    <>
      <PageHeader title="Blog" description={`${blogs.length} post${blogs.length === 1 ? "" : "s"}`} action={{ href: "/dashboard/blog/new", label: "+ New post" }} />
      <Table columns={["Title", "Tags", "Status", "Date", ""]} empty={blogs.length ? null : "No posts yet — write the first one."}>
        {blogs.map((b) => (
          <tr key={b._id} className="hover:bg-white/[0.02]">
            <td className="px-4 py-3">
              <p className="font-medium text-white">{b.title}</p>
              <p className="text-xs text-fg-subtle">{b.readingTime || 1} min · /blog/{b.slug || b._id}</p>
            </td>
            <td className="px-4 py-3 text-fg-muted">{b.tags?.join(", ")}</td>
            <td className="px-4 py-3"><Badge tone={b.isPublished === false ? "muted" : "green"}>{b.isPublished === false ? "Draft" : "Published"}</Badge></td>
            <td className="px-4 py-3 text-fg-muted">{formatDate(b.dateTime || b.createdAt)}</td>
            <td className="px-4 py-3"><BlogActions blog={b} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
