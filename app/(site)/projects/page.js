import { apiGet } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { PageHero, Section } from "@/components/ui/primitives";
import { ProjectList } from "@/components/content/lists";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";

export const revalidate = 300;

export const metadata = {
  title: "Projects",
  description: "Space and data-science projects built by Deep Sky Society members — exoplanet classifiers, telescope builds, simulations and more.",
};

export default async function ProjectsPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page, 10) || 1);
  const path = `/projects?page=${page}&limit=12`;
  const [projects, user] = await Promise.all([apiGet(path, { tags: ["projects"] }), getCurrentUser()]);

  return (
    <>
      <PageHero eyebrow="Projects" title="Things we're building" description="Real projects by real members: machine learning on NASA data, DIY instruments, simulations, outreach tools. Approved by the club, credited to the maker.">
        <Button href={user ? "/members/projects/new" : "/join"}>{user ? "Submit a project" : "Join to submit yours"}</Button>
      </PageHero>
      <Section className="!pt-0">
        <ProjectList key={path} initial={projects} path={path} cacheKey={`projects:${page}`} />
        <Pagination pagination={projects?.pagination} basePath="/projects" />
      </Section>
    </>
  );
}
