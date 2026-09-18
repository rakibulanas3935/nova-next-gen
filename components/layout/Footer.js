import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Linkedin, Github, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { Dust } from "@/components/ui/primitives";

const social = [
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.social.youtube, label: "YouTube", Icon: Youtube },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.social.github, label: "GitHub", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <Dust count={10} />
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_10%_20%,#4F46E5,transparent_45%),radial-gradient(circle_at_90%_80%,#9333EA,transparent_45%)]" aria-hidden />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.6fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
            <span className="font-display text-base font-semibold text-white">Deep Sky Society</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{SITE.tagline}</p>
          <a href={`mailto:${SITE.email}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-white"><Mail className="h-3.5 w-3.5" /> {SITE.email}</a>
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
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-muted hover:text-white">{l.label}</Link>
              </li>
            ))}
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
