"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, UserCircle2, ChevronDown, ArrowUpRight, Instagram, Youtube, Github } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1];

function Avatar({ user, className }) {
  return (
    <span className={clsx("flex items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300", className)}>
      {user.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.photo} alt="" className="h-full w-full object-cover" />
      ) : (
        user.name?.[0]?.toUpperCase()
      )}
    </span>
  );
}

function useLogout() {
  const router = useRouter();
  return async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };
}

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const isAdmin = user.role === "admin" && user.status === "approved";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line bg-white/5 py-1 pl-1 pr-2.5 text-sm transition-colors hover:border-line-strong ring-focus"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar user={user} className="h-7 w-7" />
        <span className="hidden max-w-[7rem] truncate xl:block">{user.name?.split(" ")[0]}</span>
        <ChevronDown className={clsx("h-3.5 w-3.5 text-fg-muted transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="glass absolute right-0 z-20 mt-2 w-56 origin-top-right overflow-hidden rounded-xl p-1.5 text-sm"
            >
              <div className="px-3 py-2 text-xs text-fg-subtle">@{user.userName} · {user.status === "approved" ? user.role : "pending approval"}</div>
              {isAdmin && (
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSheet({ open, onClose, user, pathname }) {
  const reduce = useReducedMotion();
  const logout = useLogout();
  const isAdmin = user?.role === "admin" && user?.status === "approved";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const item = { hidden: { opacity: 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-40 flex flex-col bg-space-950/85 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_0%,rgba(147,51,234,0.18),transparent),radial-gradient(50%_40%_at_10%_100%,rgba(168,85,247,0.12),transparent)]" />
          <motion.nav
            className="relative flex flex-1 flex-col px-6 pb-8 pt-24"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }, hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } } }}
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <motion.li key={l.href} variants={item}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className={clsx("group flex items-center justify-between rounded-xl px-3 py-3 font-display text-2xl font-semibold tracking-tight", active ? "text-star-300" : "text-white/90 hover:text-white")}
                    >
                      {l.label}
                      <ArrowUpRight className="h-5 w-5 text-fg-subtle opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={item} className="mt-auto space-y-4 border-t border-line pt-6">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar user={user} className="h-10 w-10 text-sm" />
                    <div className="min-w-0 text-sm">
                      <p className="truncate font-medium text-white">{user.name}</p>
                      <p className="truncate text-xs text-fg-subtle">@{user.userName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {isAdmin ? <Button href="/dashboard" onClick={onClose}>Dashboard</Button> : <Button href="/members" onClick={onClose}>Members area</Button>}
                    <Button variant="secondary" onClick={() => { onClose(); logout(); }}>Log out</Button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button href="/login" variant="secondary" onClick={onClose}>Log in</Button>
                  <Button href="/join" onClick={onClose}>Join the club</Button>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-fg-subtle">
                <span>© {new Date().getFullYear()} Deep Sky Society</span>
                <span className="flex gap-3">
                  <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white"><Instagram className="h-4 w-4" /></a>
                  <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white"><Youtube className="h-4 w-4" /></a>
                  <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white"><Github className="h-4 w-4" /></a>
                </span>
              </div>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <motion.nav
          aria-label="Main"
          layout
          transition={{ duration: 0.35, ease: EASE }}
          className={clsx(
            "mx-auto flex h-14 items-center justify-between rounded-2xl border px-3 transition-[background-color,border-color,box-shadow,max-width] duration-300 sm:px-4",
            scrolled || open
              ? "max-w-5xl border-line bg-space-950/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "max-w-[76rem] border-transparent bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 rounded-lg ring-focus">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full" priority />
            <span className="font-display text-[15px] font-semibold tracking-wide text-white">
              Deep Sky <span className="text-star-400">Society</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    className={clsx("relative z-10 rounded-lg px-3 py-2 text-[13.5px] transition-colors ring-focus", active ? "text-white" : "text-fg-muted hover:text-white")}
                  >
                    {l.label}
                  </Link>
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg bg-white/[0.07]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
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
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl text-fg transition-colors hover:bg-white/5 ring-focus lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.nav>
      </header>

      <MobileSheet open={open} onClose={() => setOpen(false)} user={user} pathname={pathname} />
    </>
  );
}
