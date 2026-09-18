import Image from "next/image";
import { apiGet } from "@/lib/api";
import { FOUNDER_STORY, ABOUT_DSS, VALUES, TIMELINE, SITE } from "@/lib/content";
import { PageHero, Section, SectionHeader, Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";

export const revalidate = 3600;

export const metadata = {
  title: "About",
  description: `The story behind ${SITE.name}: a student-founded astronomy club that grew from a handshake with Buzz Aldrin into a global community.`,
};

export default async function AboutPage() {
  const members = await apiGet("/users/members", { tags: ["members"], revalidate: 3600 });
  const team = (members?.data?.users || []).filter((u) => u.role === "admin").slice(0, 8);

  return (
    <>
      <PageHero video="about" fx="nebula" eyebrow="Empowering Student Innovators 🚀" title="Beyond the Stars" description="Learn about our mission, our journey, and the dedicated explorers who bring the wonders of the universe closer to you.">
        <Button href="/join">Join Club</Button>
        <Button href="/contact" variant="secondary">Get in Touch</Button>
      </PageHero>

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image src="/gallery/sky-space-dark-galaxy.jpg" alt="Deep-sky view of a galaxy" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-950 to-transparent p-6">
                <p className="eyebrow">About Us</p>
                <p className="mt-1 font-display text-2xl text-white">Learn more about our mission, goals, and story.</p>
              </div>
            </div>
          </div>
          <div className="prose prose-invert prose-sky max-w-none prose-p:text-fg-muted prose-p:leading-relaxed">
            <h2 className="!mt-0">About Us</h2>
            {FOUNDER_STORY.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl text-white" : undefined}>{p}</p>
            ))}
            <p className="text-fg">— Carlos</p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader title="About Deep Sky Society" />
        <div className="prose prose-invert prose-sky max-w-3xl prose-p:text-fg-muted">
          {ABOUT_DSS.intro.map((p, i) => <p key={i}>{p}</p>)}
          <p className="text-fg">{ABOUT_DSS.listTitle}</p>
          <ul>
            {ABOUT_DSS.list.map((li) => <li key={li}>{li}</li>)}
          </ul>
          {ABOUT_DSS.outro.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader title="Our Goals & Values" />
        <div className="max-w-3xl space-y-2 text-fg-muted">
          {VALUES.intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.items.map(([title, text]) => (
            <Card key={title} className="p-6">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Timeline" title="Our Journey" />
        <ol className="relative ml-3 border-l border-line pl-8 sm:ml-6">
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.35rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-star-500/40 bg-space-900">
                <span className="h-2 w-2 rounded-full bg-star-500" />
              </span>
              <p className="font-mono text-xs tracking-widest text-star-400">{t.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{t.title}</h3>
              <p className="mt-1 max-w-xl text-sm text-fg-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {team.length > 0 && (
        <Section className="!pt-0">
          <SectionHeader eyebrow="Team" title="The people running things" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((u) => (
              <Card key={u._id} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-star-500/15 font-semibold text-star-300">
                  {u.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={u.photo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    u.name?.[0]
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{u.name}</p>
                  <p className="truncate text-xs text-fg-subtle">{u.bio || "Organiser"}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
