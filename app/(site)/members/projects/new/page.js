import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { Container } from "@/components/ui/primitives";
import { ProjectForm } from "@/components/forms/ContentForms";

export const metadata = { title: "Submit a project", robots: { index: false } };

export default async function NewProjectPage() {
  const user = await requireUser("/members/projects/new");
  if (user.status !== "approved") redirect("/members");
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <Container>
        <Link href="/members" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white"><ArrowLeft className="h-4 w-4" /> Members area</Link>
        <h1 className="mt-4 text-3xl font-semibold text-white">Submit a project</h1>
        <p className="mt-1 mb-8 text-fg-muted">Tell the club what you built. An admin reviews it, then it's live with your name on it.</p>
        <ProjectForm isAdmin={user.role === "admin"} backHref="/members" />
      </Container>
    </div>
  );
}
