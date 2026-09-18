import { apiGet } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { PageHero, Section } from "@/components/ui/primitives";
import GalleryGrid from "@/components/content/GalleryGrid";
import Button from "@/components/ui/Button";

export const revalidate = 300;

export const metadata = {
  title: "Gallery",
  description: "Astrophotography and event photos from Deep Sky Society members — the Moon, planets, nebulae, galaxies and nights out under the stars.",
};

export default async function GalleryPage() {
  const [gallery, user] = await Promise.all([apiGet("/gallery/approved?limit=24", { tags: ["gallery"] }), getCurrentUser()]);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Through our eyepieces" description="Photos by members: from phone snaps at a telescope to stacked deep-sky images. Every shot is credited to the person who took it.">
        <Button href={user ? "/members/photos/new" : "/join"}>{user ? "Upload photos" : "Join to share yours"}</Button>
      </PageHero>
      <Section className="!pt-0">
        <GalleryGrid initial={gallery} />
      </Section>
    </>
  );
}
