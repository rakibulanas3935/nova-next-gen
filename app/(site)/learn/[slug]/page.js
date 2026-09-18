import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { apiGet } from "@/lib/api";
import { LEARN_TRACKS } from "@/lib/content";
import { Container, Badge, Card } from "@/components/ui/primitives";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";

export const revalidate = 600;

const LEVEL_TONE = { beginner: "green", intermediate: "sky", advanced: "nebula" };

async function load(slug) {
  const track = LEARN_TRACKS.find((t) => t.slug === slug);
  if (track) return { track };
  const res = await apiGet(`/learn/${slug}`, { tags: ["learn"] });
  return res?.data?.learn ? { lesson: res.data.learn } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await load(slug);
  const item = data?.track || data?.lesson;
  if (!item) return { title: "Lesson" };
  return { title: item.title, description: item.summary || item.excerpt };
}

export default async function LearnDetailPage({ params }) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const { track, lesson } = data;
  const item = track || lesson;
  const idx = track ? LEARN_TRACKS.findIndex((t) => t.slug === slug) : -1;
  const nextTrack = idx >= 0 ? LEARN_TRACKS[idx + 1] : null;

  return (
    <article className="pt-28 sm:pt-32">
      <Container className="max-w-3xl">
        <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Learn
        </Link>
        <div className="mt-6 flex items-center gap-3">
          {track && <span className="text-4xl" aria-hidden>{track.emoji}</span>}
          <Badge tone={LEVEL_TONE[item.level] || "muted"}>{item.level || "lesson"}</Badge>
          {lesson?.category && <span className="text-xs text-fg-subtle">{lesson.category}</span>}
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{item.title}</h1>
        {item.summary && <p className="mt-4 text-lg text-fg-muted">{item.summary}</p>}

        {track?.body && (
          <div className="prose prose-invert prose-sky prose-lg mt-8 max-w-none prose-p:text-fg-muted">
            {track.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}

        {track?.links && (
          <ul className="mt-8 grid gap-3">
            {track.links.map((l) => (
              <li key={l.href}>
                <Card as="a" href={l.href} target="_blank" rel="noopener noreferrer" hover className="flex items-start justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium text-white">{l.label}</p>
                    <p className="mt-1 text-sm text-fg-muted">{l.text}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-sky-400" />
                </Card>
              </li>
            ))}
          </ul>
        )}

        {lesson && <RichText html={lesson.description} className="mt-8 prose-lg" />}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <Button href="/learn" variant="secondary">Back to all tracks</Button>
          {nextTrack && (
            <Button href={`/learn/${nextTrack.slug}`}>Next: {nextTrack.title}</Button>
          )}
        </div>
      </Container>
    </article>
  );
}
