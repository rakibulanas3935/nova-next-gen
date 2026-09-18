import { apiGet } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

export default async function sitemap() {
  const staticPages = ["", "/about", "/events", "/blog", "/projects", "/learn", "/gallery", "/sky-tonight", "/join", "/contact"].map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const [blogs, events, projects] = await Promise.all([
    apiGet("/blogs?limit=50", { revalidate: 3600 }),
    apiGet("/events?limit=50", { revalidate: 3600 }),
    apiGet("/projects?limit=50", { revalidate: 3600 }),
  ]);

  const entries = (list, base) =>
    (list || []).map((d) => ({ url: `${siteUrl}/${base}/${d.slug || d._id}`, lastModified: d.updatedAt, changeFrequency: "monthly", priority: 0.6 }));

  return [
    ...staticPages,
    ...entries(blogs?.data?.blogs, "blog"),
    ...entries(events?.data?.events, "events"),
    ...entries(projects?.data?.projects, "projects"),
  ];
}
