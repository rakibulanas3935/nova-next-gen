import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, MapPin, Video, Lock, Clock3 } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { formatDateTime, formatTime, icsHref, isPast, EVENT_TYPES } from "@/lib/format";
import { Container, Badge, Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import SmartImage from "@/components/ui/SmartImage";
import Countdown from "@/components/content/Countdown";
import { EventList } from "@/components/content/lists";
import { findSeedEvent, withSeedEvents } from "@/lib/seed-events";

export const revalidate = 300;

async function loadEvent(slug) {
  const res = await apiGet(`/events/${slug}`, { tags: ["events"] });
  return res?.data?.event || findSeedEvent(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.excerpt,
    openGraph: { title: event.title, description: event.excerpt, images: event.poster ? [{ url: event.poster }] : undefined },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const [event, user, more] = await Promise.all([
    loadEvent(slug),
    getCurrentUser(),
    apiGet("/events/upcoming?limit=2", { tags: ["events"] }),
  ]);
  if (!event) notFound();

  const past = isPast(event.eventTime);
  const type = EVENT_TYPES[event.type] || EVENT_TYPES.other;
  const canSeeLink = !event.membersOnly || (user && user.status === "approved");
  const others = withSeedEvents(more?.data?.events || [], { scope: "upcoming" }).filter((e) => e._id !== event._id).slice(0, 1);

  return (
    <article className="pt-24 sm:pt-32">
      <Container>
        <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All events
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={past ? "muted" : "gold"}>{type.emoji} {type.label}</Badge>
              {event.membersOnly && <Badge tone="nebula"><Lock className="h-3 w-3" /> Members only</Badge>}
              {past && <Badge tone="muted">Past event</Badge>}
            </div>
            <h1 className="mt-4 text-[1.9rem] font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{event.title}</h1>
            <p className="mt-4 inline-flex items-center gap-2 text-fg-muted"><Clock3 className="h-4 w-4 text-star-400" /> {formatDateTime(event.eventTime)}{event.endTime ? ` – ${formatTime(event.endTime)}` : ""}</p>

            {event.poster && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
                <SmartImage src={event.poster} alt={event.title} priority sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            )}

            <RichText html={event.description} className="mt-8" />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Card className="p-6">
              {!past && (
                <>
                  <p className="eyebrow mb-3">Starts in</p>
                  <Countdown to={event.eventTime} className="mb-6" />
                </>
              )}
              <dl className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                  <div>
                    <dt className="text-fg-subtle">Where</dt>
                    <dd className="text-fg">{event.location || (event.meetLink ? "Online" : "To be announced")}</dd>
                  </div>
                </div>
                {(event.meetLink || event.locked) && (
                  <div className="flex gap-3">
                    <Video className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <div className="min-w-0">
                      <dt className="text-fg-subtle">Meeting link</dt>
                      <dd className="text-fg">
                        {canSeeLink && event.meetLink ? (
                          <a href={event.meetLink} target="_blank" rel="noopener noreferrer" className="break-all text-sky-400 hover:underline">{event.meetLink}</a>
                        ) : (
                          <span className="text-fg-muted">Members only — <Link href={`/login?next=/events/${event.slug || event._id}`} className="text-star-300 hover:underline">log in</Link> to see it.</span>
                        )}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                {!past && (
                  <Button as="a" href={icsHref(event)} download={`${event.slug || "event"}.ics`} variant="secondary">
                    <CalendarPlus className="h-4 w-4" /> Add to calendar
                  </Button>
                )}
                {!user && <Button href="/join">Join the club</Button>}
              </div>
            </Card>

            {others.length > 0 && (
              <div>
                <p className="eyebrow mb-3">Also coming up</p>
                <EventList initial={{ data: { events: others } }} path="/events/upcoming?limit=3" cacheKey="events:sidebar" compact scope="upcoming" max={1} columns={1} excludeId={event._id} />
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
