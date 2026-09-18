import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin, Github, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";

const social = [
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.social.youtube, label: "YouTube", Icon: Youtube },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.social.github, label: "GitHub", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(245,185,66,0.08),transparent)]" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
            <span className="font-display text-base font-semibold text-white">Deep Sky Society</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{SITE.tagline} Telescope nights, AI-astrophysics workshops and a community of curious minds.</p>
          <div className="mt-5 flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-white ring-focus"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="grid gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-muted hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Club</h4>
          <ul className="grid gap-2 text-sm">
            <li><Link href="/join" className="text-fg-muted hover:text-white">Become a member</Link></li>
            <li><Link href="/members" className="text-fg-muted hover:text-white">Members area</Link></li>
            <li><Link href="/contact" className="text-fg-muted hover:text-white">Contact</Link></li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 text-fg-muted hover:text-white">
                <Mail className="h-3.5 w-3.5" /> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x relative flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Deep Sky Society. All rights reserved.</p>
        <p>Keep looking up. ✦</p>
      </div>
    </footer>
  );
}
