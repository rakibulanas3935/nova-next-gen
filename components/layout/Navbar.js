"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Menu, X, LogOut, LayoutDashboard, UserCircle2, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/content";

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line bg-white/5 py-1 pl-1 pr-3 text-sm hover:border-line-strong ring-focus"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300">
          {user.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            user.name?.[0]?.toUpperCase()
          )}
        </span>
        <span className="hidden max-w-[8rem] truncate sm:block">{user.name?.split(" ")[0]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-fg-muted" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div role="menu" className="glass absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl p-1.5 text-sm shadow-card">
            <div className="px-3 py-2 text-xs text-fg-subtle">
              @{user.userName} · {user.status === "approved" ? user.role : "pending"}
            </div>
            {user.role === "admin" && user.status === "approved" && (
              <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5">
                <LayoutDashboard className="h-4 w-4 text-star-400" /> Dashboard
              </Link>
            )}
            <Link href="/members" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5">
              <UserCircle2 className="h-4 w-4 text-sky-400" /> Members area
            </Link>
            <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-white/5">
              <LogOut className="h-4 w-4 text-fg-muted" /> Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-line bg-space-950/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-[4.5rem]" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 ring-focus rounded-lg">
          <Image src="/logo.png" alt="" width={34} height={34} className="rounded-full" priority />
          <span className="font-display text-[15px] font-semibold tracking-wide text-white">
            Deep Sky <span className="text-star-400">Society</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={clsx(
                    "rounded-lg px-3 py-2 text-sm transition-colors ring-focus",
                    active ? "text-white" : "text-fg-muted hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">Log in</Button>
              <Button href="/join" size="sm">Join the club</Button>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-fg hover:bg-white/5 ring-focus lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="container-x border-t border-line pb-6 pt-3 lg:hidden">
          <ul className="grid gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-lg px-3 py-2.5 text-base text-fg hover:bg-white/5">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="my-2 border-t border-line" />
            {user ? (
              <>
                {user.role === "admin" && (
                  <li><Link href="/dashboard" className="block rounded-lg px-3 py-2.5 text-base text-star-300 hover:bg-white/5">Dashboard</Link></li>
                )}
                <li><Link href="/members" className="block rounded-lg px-3 py-2.5 text-base text-fg hover:bg-white/5">Members area</Link></li>
              </>
            ) : (
              <li className="mt-2 flex gap-2 px-3">
                <Button href="/login" variant="secondary" className="flex-1">Log in</Button>
                <Button href="/join" className="flex-1">Join</Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
