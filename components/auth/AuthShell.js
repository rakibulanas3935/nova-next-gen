import Link from "next/link";
import Image from "next/image";

/** Centered card used by login / join / reset pages. */
export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 pb-16 pt-28">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full" />
          </Link>
          {eyebrow && <p className="eyebrow mt-5">{eyebrow}</p>}
          <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
          {description && <p className="mt-2 text-sm text-fg-muted">{description}</p>}
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-fg-muted">{footer}</div>}
      </div>
    </div>
  );
}
