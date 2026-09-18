import { Mail, MessageCircle, Users } from "lucide-react";
import { SITE } from "@/lib/content";
import { PageHero, Section, Card } from "@/components/ui/primitives";
import ContactForm from "@/components/content/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Deep Sky Society — questions about events, membership, school partnerships or speaking at a session.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero fx="nebula-gold" eyebrow="Contact" title="Say hello" description="Questions about events, membership, partnerships with your school, or want to give a talk? We'd love to hear from you." />
      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <Card className="p-5">
              <Mail className="h-5 w-5 text-star-400" />
              <p className="mt-3 font-semibold text-white">Email</p>
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-sky-400 hover:underline">{SITE.email}</a>
            </Card>
            <Card className="p-5">
              <Users className="h-5 w-5 text-star-400" />
              <p className="mt-3 font-semibold text-white">Schools & clubs</p>
              <p className="mt-1 text-sm text-fg-muted">We partner with other student groups for joint observing nights and workshops. Tell us about yours.</p>
            </Card>
            <Card className="p-5">
              <MessageCircle className="h-5 w-5 text-star-400" />
              <p className="mt-3 font-semibold text-white">Speakers</p>
              <p className="mt-1 text-sm text-fg-muted">Researcher, engineer or space entrepreneur? Our members would love to hear from you.</p>
            </Card>
          </div>
          <Card className="relative p-6 sm:p-8">
            <ContactForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
