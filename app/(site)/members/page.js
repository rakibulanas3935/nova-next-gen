import Link from "next/link";
import { Clock3, FolderKanban, Camera, UserCircle2, Lock, Plus, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Container, Card, Badge, EmptyState, SectionHeader } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import { EventCard } from "@/components/content/cards";
import { MemberProjectRow, MemberGalleryRow } from "@/components/members/rows";

export const metadata = { title: "Members area", robots: { index: false } };

export default async function MembersPage() {
  const user = await requireUser("/members");
  const approved = user.status === "approved";

  const [projects, galleries, events] = approved
    ? await Promise.all([
        apiGet("/projects/mine", { auth: true }),
        apiGet("/gallery/mine", { auth: true }),
        apiGet("/events/upcoming?limit=4", { tags: ["events"] }),
      ])
    : [null, null, null];

  const myProjects = projects?.data?.projects || [];
  const myGalleries = galleries?.data?.galleries || [];
  const upcoming = events?.data?.events || [];

  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Members area</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Hey {user.name?.split(" ")[0]} 👋</h1>
            <p className="mt-2 text-fg-muted">@{user.userName} · {user.role === "admin" ? "Admin" : "Member"} · joined {formatDate(user.createdAt)}</p>
          </div>
          <div className="flex gap-2">
            <Button href="/members/profile" variant="secondary" size="sm"><UserCircle2 className="h-4 w-4" /> Profile</Button>
            {user.role === "admin" && approved && <Button href="/dashboard" size="sm">Dashboard</Button>}
          </div>
        </div>

        {!approved && (
          <Card className="mt-10 border-star-500/30 p-8 text-center">
            <Clock3 className="mx-auto h-10 w-10 text-star-400" />
            <h2 className="mt-4 text-xl font-semibold text-white">
              {user.status === "rejected" ? "Your application wasn't approved" : "Your membership is pending approval"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
              {user.status === "rejected"
                ? "If you think this is a mistake, get in touch and we'll take another look."
                : "An admin will review your application soon — usually within a couple of days. You'll get an email the moment it's approved. Meanwhile, the blog, learning tracks and public events are all open to you."}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Button href="/learn" variant="secondary">Start learning</Button>
              <Button href="/contact" variant="ghost">Contact us</Button>
            </div>
          </Card>
        )}

        {approved && (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Card as={Link} href="/members/projects/new" hover className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-star-500/10 text-star-400"><FolderKanban className="h-5 w-5" /></span>
                <div><p className="font-semibold text-white">Submit a project</p><p className="text-xs text-fg-muted">Share what you're building</p></div>
              </Card>
              <Card as={Link} href="/members/photos/new" hover className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400"><Camera className="h-5 w-5" /></span>
                <div><p className="font-semibold text-white">Upload photos</p><p className="text-xs text-fg-muted">Astrophotography for the gallery</p></div>
              </Card>
              <Card as={Link} href="/events" hover className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-nebula-500/10 text-nebula-400"><Lock className="h-5 w-5" /></span>
                <div><p className="font-semibold text-white">Members-only links</p><p className="text-xs text-fg-muted">Meeting links are unlocked for you</p></div>
              </Card>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-12">
                <section>
                  <SectionHeader title="My projects" href="/members/projects/new" linkLabel="New project" className="!mb-5" />
                  {myProjects.length ? (
                    <div className="grid gap-3">
                      {myProjects.map((p) => <MemberProjectRow key={p._id} project={p} />)}
                    </div>
                  ) : (
                    <EmptyState icon={FolderKanban} title="No projects yet" text="Your first submission goes to an admin for a quick review, then it's live with your name on it." action={<Button href="/members/projects/new" size="sm"><Plus className="h-4 w-4" /> Submit a project</Button>} />
                  )}
                </section>

                <section>
                  <SectionHeader title="My photos" href="/members/photos/new" linkLabel="Upload" className="!mb-5" />
                  {myGalleries.length ? (
                    <div className="grid gap-3">
                      {myGalleries.map((g) => <MemberGalleryRow key={g._id} gallery={g} />)}
                    </div>
                  ) : (
                    <EmptyState icon={Camera} title="No photos yet" text="Phone shots at the eyepiece count. Upload up to 10 at a time." action={<Button href="/members/photos/new" size="sm" variant="secondary">Upload photos</Button>} />
                  )}
                </section>
              </div>

              <aside>
                <SectionHeader title="Coming up" href="/events" className="!mb-5" />
                {upcoming.length ? (
                  <div className="grid gap-3">
                    {upcoming.map((e) => <EventCard key={e._id} event={e} compact />)}
                  </div>
                ) : (
                  <Card className="p-6 text-sm text-fg-muted"><Sparkles className="mb-2 h-4 w-4 text-star-400" /> Nothing scheduled yet — you'll be first to know.</Card>
                )}
              </aside>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
