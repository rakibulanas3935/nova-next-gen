import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { apiGet } from "@/lib/api";
import { LEARN_TRACKS, GLOSSARY } from "@/lib/content";
import { PageHero, Section, SectionHeader, Card, Badge } from "@/components/ui/primitives";
import { LessonCard } from "@/components/content/cards";
import Quiz from "@/components/content/Quiz";

export const revalidate = 600;

export const metadata = {
  title: "Learn astronomy",
  description: "Start from zero: astronomy basics, choosing a telescope, astrophotography, AI in astrophysics, plus a glossary and quiz from Deep Sky Society.",
};

const LEVEL_TONE = { beginner: "green", intermediate: "sky", advanced: "nebula" };

export default async function LearnPage() {
  const res = await apiGet("/learn", { tags: ["learn"] });
  const lessons = res?.data?.learns || [];

  return (
    <>
      <PageHero video="learn" fx="nebula-teal" eyebrow="Learn" title="Cosmic Learning" description="Discover fun and easy ways to learn about stars, planets, and the universe with our astronomy resources." />

      <Section className="!pt-0" id="tracks">
        <SectionHeader eyebrow="Learning tracks" title="Start here" description="Six short tracks that take you from 'what's that bright star?' to training a model on real NASA data." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEARN_TRACKS.map((t) => (
            <Card key={t.slug} as="article" hover className="group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>{t.emoji}</span>
                <Badge tone={LEVEL_TONE[t.level]}>{t.level}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-star-300">
                <Link href={`/learn/${t.slug}`}>{t.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{t.summary}</p>
              <Link href={`/learn/${t.slug}`} className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-sky-400 hover:text-sky-300">
                Open track <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {lessons.length > 0 && (
        <Section className="!pt-0" id="lessons">
          <SectionHeader eyebrow="Workshop notes" title="Lessons from our sessions" description="Write-ups published by the team after workshops and talks." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((l) => (
              <LessonCard key={l._id} lesson={l} href={`/learn/${l.slug || l._id}`} />
            ))}
          </div>
        </Section>
      )}

      <Section className="!pt-0" id="quiz">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="Quiz" title="🧩 Quiz Time" description="Seven quick questions. No pressure, no leaderboard — just a check on what stuck." />
          </div>
          <Quiz />
        </div>
      </Section>

      <Section className="!pt-0" id="glossary">
        <SectionHeader eyebrow="Glossary" title="Words you'll hear on observing nights" />
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map(([term, def]) => (
            <div key={term} className="border-l border-star-500/40 pl-4">
              <dt className="font-medium text-white">{term}</dt>
              <dd className="mt-1 text-sm text-fg-muted">{def}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
