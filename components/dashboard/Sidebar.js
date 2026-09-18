"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Users, Newspaper, CalendarDays, FolderKanban, Camera, GraduationCap, Inbox, ExternalLink, LogOut, Menu, X } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Overview", Icon: LayoutDashboard, exact: true },
  { href: "/dashboard/members", label: "Members", Icon: Users, badge: "pendingMembers" },
  { href: "/dashboard/blog", label: "Blog", Icon: Newspaper },
  { href: "/dashboard/events", label: "Events", Icon: CalendarDays },
  { href: "/dashboard/projects", label: "Projects", Icon: FolderKanban, badge: "pendingProjects" },
  { href: "/dashboard/gallery", label: "Gallery", Icon: Camera, badge: "pendingGalleries" },
  { href: "/dashboard/learn", label: "Learn", Icon: GraduationCap },
  { href: "/dashboard/messages", label: "Messages", Icon: Inbox },
];

export default function Sidebar({ user, counts = {} }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5">
      {NAV.map(({ href, label, Icon, exact, badge }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        const n = badge ? counts[badge] : 0;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-star-500/15 text-star-300" : "text-fg-muted hover:bg-white/5 hover:text-white")}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{label}</span>
            {n > 0 && <span className="rounded-full bg-star-500 px-1.5 text-[10px] font-semibold text-space-950">{n}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="mt-auto border-t border-line pt-3">
      <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-white/5 hover:text-white"><ExternalLink className="h-4 w-4" /> View site</Link>
      <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-white/5 hover:text-white"><LogOut className="h-4 w-4" /> Log out</button>
      <div className="mt-2 flex items-center gap-3 px-3 py-2">
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-star-500/20 text-xs font-semibold text-star-300">
          {user.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photo} alt="" className="h-full w-full object-cover" />
          ) : (
            user.name?.[0]
          )}
        </span>
        <div className="min-w-0 text-xs">
          <p className="truncate font-medium text-fg">{user.name}</p>
          <p className="truncate text-fg-subtle">Admin</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-space-950/90 px-4 backdrop-blur lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-sm font-semibold text-white">
          <Image src="/logo.png" alt="" width={26} height={26} className="rounded-full" /> Dashboard
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-30 bg-space-950/95 p-4 pt-20 backdrop-blur lg:hidden">
          <div className="flex h-full flex-col">{nav}{footer}</div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-space-950/60 p-4 backdrop-blur lg:flex">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2.5 px-2">
          <Image src="/logo.png" alt="" width={30} height={30} className="rounded-full" />
          <span className="font-display text-sm font-semibold text-white">Deep Sky <span className="text-star-400">Admin</span></span>
        </Link>
        {nav}
        {footer}
      </aside>
    </>
  );
}
