import Link from "next/link";
import { Check } from "lucide-react";
import { JOIN_BENEFITS } from "@/lib/content";
import { SignupForm } from "@/components/auth/forms";
import { Container } from "@/components/ui/primitives";
import VideoBackdrop from "@/components/fx/VideoBackdrop";

export const metadata = {
  title: "Join the club",
  description: "Apply to become a member of Deep Sky Society. Open to anyone 13+ curious about astronomy, physics or technology.",
};

const STEPS = [
  ["Apply", "Two minutes. Tell us who you are and what you're into."],
  ["Get approved", "An admin reviews applications — usually within a couple of days."],
  ["Show up", "Come to a telescope night, submit a project, share a photo."],
];

export default function JoinPage() {
  return (
    <div className="relative isolate pt-28 pb-20 sm:pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem]"><VideoBackdrop name="join" opacity={0.45} /></div>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Membership</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Join Deep Sky Society</h1>
            <p className="mt-5 text-lg text-fg-muted">We welcome all space enthusiasts — ideal for ages 13+, especially anyone curious about astronomy, physics or technology. No experience needed; bring questions.</p>

            <ul className="mt-8 grid gap-3">
              {JOIN_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-fg">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-star-500/15 text-star-400"><Check className="h-3 w-3" /></span>
                  {b}
                </li>
              ))}
            </ul>

            <ol className="mt-10 grid gap-4 sm:grid-cols-3">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="glass rounded-xl p-4">
                  <p className="font-mono text-xs text-star-400">0{i + 1}</p>
                  <p className="mt-1 font-semibold text-white">{t}</p>
                  <p className="mt-1 text-xs text-fg-muted">{d}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xl font-semibold text-white">Apply for membership</h2>
            <p className="mb-6 mt-1 text-sm text-fg-muted">Already a member? <Link href="/login" className="text-star-300 hover:underline">Log in</Link></p>
            <SignupForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
