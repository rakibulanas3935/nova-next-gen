import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { apiGet } from "@/lib/api";
import { formatLongDate } from "@/lib/format";
import { Container, Badge, SectionHeader } from "@/components/ui/primitives";
import RichText from "@/components/ui/RichText";
import SmartImage from "@/components/ui/SmartImage";
import ShareBar from "@/components/content/ShareBar";
import { BlogCard } from "@/components/content/cards";

export const revalidate = 300;

async function loadBlog(slug) {
  const res = await apiGet(`/blogs/${slug}`, { tags: ["blogs"] });
  return res?.data || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await loadBlog(slug);
  if (!data?.blog) return { title: "Post" };
  const { blog } = data;
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { type: "article", title: blog.title, description: blog.excerpt, publishedTime: blog.dateTime, images: blog.blogImage ? [{ url: blog.blogImage }] : undefined },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const data = await loadBlog(slug);
  if (!data?.blog) notFound();
  const { blog, related = [] } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.dateTime,
    dateModified: blog.updatedAt,
    image: blog.blogImage,
    author: { "@type": "Person", name: blog.author?.name || "Deep Sky Society" },
    publisher: { "@type": "Organization", name: "Deep Sky Society" },
    description: blog.excerpt,
  };

  return (
    <article className="pt-24 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>

        <header className="mt-6">
          {blog.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {blog.tags.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}><Badge tone="sky">#{t}</Badge></Link>
              ))}
            </div>
          )}
          <h1 className="text-[1.9rem] font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{blog.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300">
                {blog.author?.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={blog.author.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  (blog.author?.name || "D")[0]
                )}
              </span>
              {blog.author?.name || "Deep Sky Society"}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={blog.dateTime}>{formatLongDate(blog.dateTime || blog.createdAt)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {blog.readingTime || 1} min read</span>
          </div>
        </header>

        {blog.blogImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
            <SmartImage src={blog.blogImage} alt={blog.title} priority sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        )}

        <RichText html={blog.description} className="mt-10 prose-lg" />

        <ShareBar title={blog.title} />
      </Container>

      {related.length > 0 && (
        <Container className="mt-20">
          <SectionHeader eyebrow="Keep reading" title="Related posts" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
