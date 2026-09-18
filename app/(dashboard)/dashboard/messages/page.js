import { apiGet } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import { Card } from "@/components/ui/primitives";
import { PageHeader } from "@/components/dashboard/ui";
import { MessageDelete } from "@/components/dashboard/resourceActions";

export const metadata = { title: "Messages" };

export default async function MessagesAdminPage() {
  const res = await apiGet("/message", { auth: true });
  const messages = res?.data?.messages || [];
  return (
    <>
      <PageHeader title="Messages" description="Sent from the contact form. Also forwarded to the club inbox." />
      {messages.length === 0 ? (
        <Card className="p-10 text-center text-sm text-fg-muted">Inbox zero. ✦</Card>
      ) : (
        <div className="grid gap-3">
          {messages.map((m) => (
            <Card key={m._id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-white">{m.name} <a href={`mailto:${m.email}`} className="ml-1 text-sm font-normal text-sky-400 hover:underline">{m.email}</a></p>
                  <p className="text-xs text-fg-subtle">{timeAgo(m.createdAt)}</p>
                </div>
                <MessageDelete id={m._id} />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">{m.message}</p>
              <a href={`mailto:${m.email}?subject=Re: your message to Deep Sky Society`} className="mt-4 inline-block text-sm text-star-300 hover:underline">Reply by email →</a>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
