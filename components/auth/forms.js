"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/form";

async function postJson(url, body) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json;
}

function PasswordInput({ name, placeholder = "••••••••", autoComplete, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input name={name} type={show ? "text" : "password"} placeholder={placeholder} autoComplete={autoComplete} className="pr-11" required minLength={8} {...props} />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg" aria-label={show ? "Hide password" : "Show password"} tabIndex={-1}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

const safeNext = (n) => (n && n.startsWith("/") && !n.startsWith("//") ? n : null);

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await postJson("/api/auth/login", { identifier: fd.get("identifier"), password: fd.get("password") });
      const user = res.data?.user;
      toast.success(`Welcome back, ${user?.name?.split(" ")[0] || "explorer"}`);
      const next = safeNext(params.get("next"));
      router.push(next || (user?.role === "admin" && user?.status === "approved" ? "/dashboard" : "/members"));
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Email or username" htmlFor="identifier">
        <Input id="identifier" name="identifier" autoComplete="username" placeholder="you@example.com" required />
      </Field>
      <Field label="Password" htmlFor="password">
        <PasswordInput id="password" name="password" autoComplete="current-password" />
      </Field>
      {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      <div className="flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-fg-muted hover:text-white">Forgot password?</Link>
      </div>
      <Button type="submit" loading={loading} className="w-full">Log in</Button>
    </form>
  );
}

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("password") !== fd.get("passwordConfirm")) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await postJson("/api/auth/signup", Object.fromEntries(fd));
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
        <h2 className="mt-4 text-xl font-semibold text-white">Application received</h2>
        <p className="mt-2 text-sm text-fg-muted">An admin will review it shortly. You'll get an email when your membership is approved — you can log in any time to check your status.</p>
        <Button href="/login" variant="secondary" className="mt-6">Go to login</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Full name" htmlFor="name" required>
        <Input id="name" name="name" autoComplete="name" placeholder="Ada Lovelace" required maxLength={80} />
      </Field>
      <Field label="Username" htmlFor="userName" hint="Letters, numbers, _ and . — this is public." required>
        <Input id="userName" name="userName" autoComplete="username" placeholder="ada.l" required minLength={3} maxLength={30} pattern="[A-Za-z0-9_.]+" />
      </Field>
      <Field label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" htmlFor="password" hint="At least 8 characters" required>
          <PasswordInput id="password" name="password" autoComplete="new-password" />
        </Field>
        <Field label="Confirm" htmlFor="passwordConfirm" required>
          <PasswordInput id="passwordConfirm" name="passwordConfirm" autoComplete="new-password" />
        </Field>
      </div>
      <Field label="What are you into?" htmlFor="interests" hint="Optional — helps us plan sessions.">
        <Textarea id="interests" name="interests" rows={2} maxLength={200} placeholder="Astrophotography, exoplanets, building telescopes…" />
      </Field>
      {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">Apply for membership</Button>
      <p className="text-center text-xs text-fg-subtle">By applying you agree to be kind, curious and to share the eyepiece.</p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const request = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await postJson("/api/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("password") !== fd.get("passwordConfirm")) return setError("Passwords do not match");
    setLoading(true);
    setError("");
    try {
      await postJson("/api/auth/reset-password", { email, otp: fd.get("otp"), password: fd.get("password"), passwordConfirm: fd.get("passwordConfirm") });
      toast.success("Password updated — you're logged in");
      router.push("/members");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={request} className="space-y-4">
        <Field label="Email" htmlFor="email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </Field>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">Send reset code</Button>
      </form>
    );
  }
  return (
    <form onSubmit={reset} className="space-y-4">
      <p className="text-sm text-fg-muted">If <strong className="text-fg">{email}</strong> is registered, a 6-digit code is on its way. It expires in 15 minutes.</p>
      <Field label="Reset code" htmlFor="otp">
        <Input id="otp" name="otp" inputMode="numeric" pattern="\d{6}" maxLength={6} placeholder="123456" required className="tracking-[0.4em] text-center font-mono" />
      </Field>
      <Field label="New password" htmlFor="password">
        <PasswordInput id="password" name="password" autoComplete="new-password" />
      </Field>
      <Field label="Confirm new password" htmlFor="passwordConfirm">
        <PasswordInput id="passwordConfirm" name="passwordConfirm" autoComplete="new-password" />
      </Field>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">Set new password</Button>
      <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-fg-muted hover:text-white">Use a different email</button>
    </form>
  );
}
