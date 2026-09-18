import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/forms";

export const metadata = { title: "Reset password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account"
      title="Reset your password"
      description="We'll email you a one-time code."
      footer={<Link href="/login" className="text-fg-muted hover:text-white">Back to login</Link>}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
