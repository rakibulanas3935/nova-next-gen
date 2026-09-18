import { Suspense } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/forms";

export const metadata = { title: "Log in", robots: { index: false } };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in"
      description="Members area, event links and your submissions."
      footer={<>New here? <Link href="/join" className="text-star-300 hover:underline">Apply for membership</Link></>}
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
