import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { Container } from "@/components/ui/primitives";
import PhotoUploadForm from "@/components/members/PhotoUploadForm";

export const metadata = { title: "Upload photos", robots: { index: false } };

export default async function NewPhotosPage() {
  const user = await requireUser("/members/photos/new");
  if (user.status !== "approved") redirect("/members");
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <Container className="max-w-3xl">
        <Link href="/members" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white"><ArrowLeft className="h-4 w-4" /> Members area</Link>
        <h1 className="mt-4 text-3xl font-semibold text-white">Upload photos</h1>
        <p className="mt-1 mb-8 text-fg-muted">Up to 10 images, 8 MB each. {user.role === "admin" ? "As an admin they go live immediately." : "An admin approves them before they appear in the gallery."}</p>
        <PhotoUploadForm backHref="/members" />
      </Container>
    </div>
  );
}
