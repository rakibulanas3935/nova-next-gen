"use client";

import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">Something went wrong</p>
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Cloudy skies</h1>
      <p className="mt-4 max-w-md text-fg-muted">{error?.message || "An unexpected error occurred."}</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">Back home</Button>
      </div>
    </main>
  );
}
