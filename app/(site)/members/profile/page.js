import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { Container } from "@/components/ui/primitives";
import { ProfileForm, PasswordForm } from "@/components/members/ProfileForms";

export const metadata = { title: "Profile", robots: { index: false } };

export default async function ProfilePage() {
  const user = await requireUser("/members/profile");
  return (
    <div className="pt-28 pb-20 sm:pt-32">
      <Container className="max-w-3xl">
        <Link href="/members" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white"><ArrowLeft className="h-4 w-4" /> Members area</Link>
        <h1 className="mt-4 text-3xl font-semibold text-white">Your profile</h1>
        <p className="mt-1 text-fg-muted">@{user.userName} · {user.email}</p>
        <div className="mt-8 grid gap-6">
          <ProfileForm user={user} />
          {user.status === "approved" && <PasswordForm />}
        </div>
      </Container>
    </div>
  );
}
