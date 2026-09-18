import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { apiGet } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { ProjectForm } from "@/components/forms/ContentForms";

export const metadata = { title: "Edit project", robots: { index: false } };

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const user = await requireUser(`/members/projects/${id}/edit`);
  if (user.status !== "approved") redirect("/members");
  const res = await apiGet(`/projects/${id}`, { auth: true });
  const project = res?.data?.project;
  if (!project) notFound();
  const ownerId = project.createdBy?._id || project.createdBy;
  if (user.role !== "admin" && String(ownerId) !== String(user._id)) redirect("/members");

  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <Container>
        <Link href="/members" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white"><ArrowLeft className="h-4 w-4" /> Members area</Link>
        <h1 className="mt-4 text-3xl font-semibold text-white">Edit project</h1>
        <p className="mt-1 mb-8 text-fg-muted">{user.role === "admin" ? "Changes go live immediately." : "Edits send the project back for a quick re-review."}</p>
        <ProjectForm project={project} isAdmin={user.role === "admin"} backHref="/members" />
      </Container>
    </div>
  );
}
