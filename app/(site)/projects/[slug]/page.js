import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { apiGet } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Container, Badge, Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import SmartImage from "@/components/ui/SmartImage";
import ShareBar from "@/components/content/ShareBar";
import { findSeedProject } from "@/lib/seed-projects";

export const revalidate = 300;

async function loadProject(slug) {
  const res = await apiGet(`/projects/${slug}`, { tags: ["projects"] });
  return res?.data?.project || findSeedProject(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await loadProject(slug);
  if (!p) return { title: "Project" };
  return { title: p.title, description: p.excerpt, openGraph: { title: p.title, description: p.excerpt, images: p.projectImage ? [{ url: p.projectImage }] : undefined } };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();
  const author = project.createdBy;

  return (
    <article className="pt-28 sm:pt-32">
      <Container>
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.isFeatured && <Badge tone="gold">★ Featured</Badge>}
              {project.tags?.map((t) => <Badge key={t} tone="sky">#{t}</Badge>)}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{project.title}</h1>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
              <SmartImage src={project.projectImage} alt={project.title} priority sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
            <RichText html={project.description} className="mt-8" />
            <ShareBar title={project.title} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card className="p-6">
              <p className="eyebrow mb-4">Project</p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-fg-subtle">Built by</dt>
                  <dd className="mt-1 flex items-center gap-2 text-fg">
                    <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300">
                      {author?.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={author.photo} alt="" className="h-full w-full object-cover" />
                      ) : (
                        (author?.name || "D")[0]
                      )}
                    </span>
                    <span>
                      {author?.name || "Deep Sky Society"}
                      {author?.userName && <span className="block text-xs text-fg-subtle">@{author.userName}</span>}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Published</dt>
                  <dd className="mt-1 text-fg">{formatDate(project.createdAt)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                {project.liveLink && (
                  <Button as="a" href={project.liveLink} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /> Visit project</Button>
                )}
                {project.repoLink && (
                  <Button as="a" href={project.repoLink} target="_blank" rel="noopener noreferrer" variant="secondary"><Github className="h-4 w-4" /> Source code</Button>
                )}
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </article>
  );
}
