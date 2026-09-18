import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/content";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_10%_20%,#4F46E5,transparent_45%),radial-gradient(circle_at_90%_80%,#9333EA,transparent_45%)]" aria-hidden />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.6fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
            <span className="font-display text-base font-semibold text-white">Deep Sky Society</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-muted hover:text-white hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x relative border-t border-line py-6 text-center text-xs text-fg-subtle">
        © {new Date().getFullYear()} Deep Sky Society. All rights reserved.
      </div>
    </footer>
  );
}
