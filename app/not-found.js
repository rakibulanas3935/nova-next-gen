import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-4xl font-semibold text-white sm:text-5xl">Lost in space</h1>
      <p className="mt-4 max-w-md text-fg-muted">That page drifted out of orbit. Let's get you back to somewhere with gravity.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back home</Button>
        <Button href="/events" variant="secondary">See events</Button>
      </div>
    </main>
  );
}
