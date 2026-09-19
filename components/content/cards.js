import Link from "next/link";
import clsx from "clsx";
import { CalendarDays, Clock3, MapPin, ExternalLink, Lock, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { Badge, Card } from "@/components/ui/primitives";
import { formatDate, formatTime, isPast, EVENT_TYPES } from "@/lib/format";

const hrefFor = (base, item) => `/${base}/${item.slug || item._id}`;

export function BlogCard({ blog, featured = false, priority = false }) {
  return (
    <Card as="article" hover className={clsx("group flex flex-col overflow-hidden", featured && "lg:flex-row")}>
      <Link href={hrefFor("blog", blog)} className={clsx("relative block overflow-hidden", featured ? "aspect-[16/10] lg:w-1/2 lg:aspect-auto" : "aspect-[16/10]")}>
        <SmartImage src={blog.blogImage} alt={blog.title} priority={priority} sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950/60 to-transparent" />
      </Link>
      <div className={clsx("flex flex-1 flex-col p-5", featured && "lg:p-8 lg:justify-center")}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
          <span>{formatDate(blog.dateTime || blog.createdAt)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {blog.readingTime || 1} min read</span>
        </div>
        <h3 className={clsx("mt-3 font-semibold leading-snug text-white group-hover:text-star-300 transition-colors", featured ? "text-2xl lg:text-3xl" : "text-lg")}>
          <Link href={hrefFor("blog", blog)}>{blog.title}</Link>
        </h3>
        {blog.excerpt && <p className={clsx("mt-2 text-sm leading-relaxed text-fg-muted", featured ? "line-clamp-4" : "line-clamp-3")}>{blog.excerpt}</p>}
        {blog.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((t) => (
              <Badge key={t} tone="sky">#{t}</Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export function EventCard({ event, compact = false }) {
  const past = isPast(event.eventTime);
  const type = EVENT_TYPES[event.type] || EVENT_TYPES.other;
  const date = new Date(event.eventTime);

  return (
    <Card as="article" hover className="group flex overflow-hidden">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-line bg-white/[0.03] py-4 text-center sm:w-20 sm:py-5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-star-400">{date.toLocaleString("en-US", { month: "short" })}</span>
        <span className="font-display text-3xl font-semibold text-white">{date.getDate()}</span>
        <span className="text-[11px] text-fg-subtle">{date.getFullYear()}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={past ? "muted" : "gold"}>{type.emoji} {type.label}</Badge>
          {event.membersOnly && <Badge tone="nebula"><Lock className="h-3 w-3" /> Members</Badge>}
          {past && <Badge tone="muted">Past</Badge>}
        </div>
        <h3 className={clsx("mt-3 font-semibold leading-snug text-white transition-colors group-hover:text-star-300", compact ? "text-base" : "text-lg")}>
          <Link href={hrefFor("events", event)}>{event.title}</Link>
        </h3>
        {!compact && event.excerpt && <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{event.excerpt}</p>}
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {formatTime(event.eventTime)}</span>
          {(event.location || event.meetLink) && (
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location || "Online"}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ProjectCard({ project }) {
  const author = project.createdBy;
  return (
    <Card as="article" hover className="group flex flex-col overflow-hidden">
      <Link href={hrefFor("projects", project)} className="relative block aspect-[16/10] overflow-hidden">
        <SmartImage src={project.projectImage} alt={project.title} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        {project.isFeatured && <Badge tone="gold" className="absolute left-3 top-3">★ Featured</Badge>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-star-300">
          <Link href={hrefFor("projects", project)}>{project.title}</Link>
        </h3>
        {project.excerpt && <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{project.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-fg-subtle">
          <span>{author?.name ? `by ${author.name}` : project.isAdminProject ? "Club project" : ""}</span>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300">
              Live <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

export function LessonCard({ lesson, href }) {
  const tone = { beginner: "green", intermediate: "sky", advanced: "nebula" }[lesson.level] || "muted";
  return (
    <Card as="article" hover className="group flex flex-col p-5">
      <div className="flex items-center justify-between">
        <Badge tone={tone}>{lesson.level || "lesson"}</Badge>
        {lesson.category && <span className="text-xs text-fg-subtle">{lesson.category}</span>}
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-star-300">
        <Link href={href}>{lesson.title}</Link>
      </h3>
      {lesson.excerpt && <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{lesson.excerpt}</p>}
      <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300">
        Read lesson <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
}
