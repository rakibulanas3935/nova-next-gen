"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContact } from "@/lib/actions/content";
import Button from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/form";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await sendContact(new FormData(e.currentTarget));
    setLoading(false);
    if (res.ok) setDone(true);
    else setError(res.message);
  };

  if (done) {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
        <h3 className="mt-4 text-xl font-semibold text-white">Message sent</h3>
        <p className="mt-2 text-sm text-fg-muted">Thanks — we read everything and reply to most messages within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name" required>
          <Input id="c-name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </Field>
        <Field label="Email" htmlFor="c-email" required>
          <Input id="c-email" name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <Field label="Message" htmlFor="c-message" required>
        <Textarea id="c-message" name="message" rows={6} required minLength={5} maxLength={1000} placeholder="Ask about events, membership, collaborations…" />
      </Field>
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <Button type="submit" loading={loading}>Send message</Button>
    </form>
  );
}
