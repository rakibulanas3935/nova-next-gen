import Link from "next/link";
import { Telescope, Orbit, Cpu, Mic, Globe2, Camera, ArrowRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import { WHAT_WE_DO, FUN_FACTS, JOIN_BENEFITS } from "@/lib/content";
import Hero from "@/components/home/Hero";
import SkyTonight from "@/components/home/SkyTonight";
import GalleryStrip from "@/components/content/GalleryStrip";
import { Section, SectionHeader, Card, AuroraLine, Dust } from "@/components/ui/primitives";
import { TiltCard } from "@/components/fx/interactive";
import { BlogList, EventList, ProjectList } from "@/components/content/lists";
import Button from "@/components/ui/Button";
import { Stagger, RevealItem } from "@/components/ui/motion";

export const revalidate = 300;

const ICONS = { telescope: Telescope, orbit: Orbit, cpu: Cpu, mic: Mic, globe: Globe2, camera: Camera };

export default async function HomePage() {
  const [events, blogs, projects, gallery] = await Promise.all([
    apiGet("/events/upcoming?limit=4", { tags: ["events"] }),
    apiGet("/blogs?limit=4", { tags: ["blogs"] }),
    apiGet("/projects?limit=3", { tags: ["projects"] }),
    apiGet("/gallery/approved?limit=8", { tags: ["gallery"] }),
  ]);

  const nextEvent = events?.data?.events?.[0] || null;
  const fact = FUN_FACTS[new Date().getDate() % FUN_FACTS.length];

  return (
    <>
      <Hero nextEvent={nextEvent} />

      <Section className="!pt-10">
        <SectionHeader eyebrow="Sky tonight" title="What's up there right now" description="Moon phase, the next meteor showers and what to look for this season — computed locally, no clouds required." href="/sky-tonight" linkLabel="Full sky guide" />
        <SkyTonight />
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Events" title="Upcoming events" description="Telescope nights, workshops and talks. Most are free and open to everyone." href="/events" />
        <EventList initial={events} path="/events/upcoming?limit=4" cacheKey="home:events" compact max={4} scope="upcoming" emptyText="Nothing on the calendar right now. Join the club to hear first when we schedule the next night out." />
      </Section>

      <AuroraLine />
      <Section className="relative !pt-16">
        <Dust />
        <SectionHeader eyebrow="What we do" title="More than a club — a launchpad" description="We create the spark through hands-on learning, collaboration and exposure to real science." />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((item, i) => {
            const Icon = ICONS[item.icon] || Telescope;
            return (
              <RevealItem key={item.title} index={i}>
                <TiltCard className="h-full rounded-2xl">
                <Card hover className="h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-star-500/10 text-star-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.text}</p>
                </Card>
                </TiltCard>
              </RevealItem>
            );
          })}
        </Stagger>
      </Section>

      <AuroraLine />
      <Section className="!pt-16">
        <SectionHeader eyebrow="Blog" title="Latest from the blog" description="Members writing about what they're observing, building and learning." href="/blog" />
        <BlogList initial={blogs} path="/blogs?limit=4" cacheKey="home:blogs" featuredFirst max={4} />
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Projects" title="Built by members" description="From exoplanet classifiers to homemade spectrographs." href="/projects" />
        <ProjectList initial={projects} path="/projects?limit=3" cacheKey="home:projects" max={3} />
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Gallery" title="Through our eyepieces" href="/gallery" />
        <GalleryStrip initial={gallery} />
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-star-500/25 bg-[radial-gradient(80%_100%_at_0%_0%,rgba(168,85,247,0.16),transparent),radial-gradient(60%_80%_at_100%_100%,rgba(59,130,246,0.16),transparent),#0b1120] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Dust count={10} />
            <div className="relative">
              <p className="eyebrow mb-4">Membership</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">Ready to join the society?</h2>
              <p className="mt-4 max-w-lg text-fg-muted">Open to anyone 13+ who's curious about astronomy, physics or technology. Apply in two minutes; an admin approves your membership.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/join" size="lg">Apply now</Button>
                <Button href="/about" size="lg" variant="secondary">Our story</Button>
              </div>
            </div>
            <ul className="grid gap-2.5 text-sm">
              {JOIN_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-fg">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-star-500" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-fg-subtle">✦ {fact}</p>
      </Section>
    </>
  );
}
