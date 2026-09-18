import { apiGet } from "@/lib/api";
import { PageHero, Section } from "@/components/ui/primitives";
import { BlogList } from "@/components/content/lists";
import Pagination from "@/components/ui/Pagination";
import BlogSearch from "@/components/content/BlogSearch";

export const revalidate = 300;

export const metadata = {
  title: "Blog",
  description: "Astronomy writing from Deep Sky Society members: observing reports, explainers, project logs and the science behind the sky.",
};

export default async function BlogPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page, 10) || 1);
  const q = (sp.q || "").toString().slice(0, 80);
  const tag = (sp.tag || "").toString().slice(0, 40);
  const query = new URLSearchParams({ page: String(page), limit: "12" });
  if (q) query.set("q", q);
  if (tag) query.set("tag", tag);
  const path = `/blogs?${query}`;
  const blogs = await apiGet(path, { tags: ["blogs"] });

  return (
    <>
      <PageHero fx="constellation" eyebrow="Blog" title="Notes from the night sky" description="Observing reports, explainers and project logs — written by members, for anyone who looks up." />
      <Section className="!pt-0">
        <BlogSearch q={q} tag={tag} />
        <BlogList key={path} initial={blogs} path={path} cacheKey={`blogs:${query}`} featuredFirst={page === 1 && !q && !tag} />
        <Pagination pagination={blogs?.pagination} basePath="/blog" params={{ ...(q && { q }), ...(tag && { tag }) }} />
      </Section>
    </>
  );
}
