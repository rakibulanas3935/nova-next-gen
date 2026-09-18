import Link from "next/link";
import clsx from "clsx";
import { Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";

export function PageHeader({ title, description, action, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
      </div>
      {action && <Button href={action.href} size="sm">{action.label}</Button>}
      {children}
    </div>
  );
}

export function StatCard({ label, value, hint, tone = "gold", href }) {
  const Tag = href ? Link : "div";
  const tones = { gold: "text-star-300", sky: "text-sky-300", nebula: "text-nebula-400", green: "text-emerald-300" };
  return (
    <Card as={Tag} href={href} hover={!!href} className="p-5">
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className={clsx("mt-2 font-display text-3xl font-semibold", tones[tone])}>{value ?? "—"}</p>
      {hint && <p className="mt-1 text-xs text-fg-muted">{hint}</p>}
    </Card>
  );
}

export function Tabs({ tabs, current, basePath, param = "status" }) {
  return (
    <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-line bg-white/[0.03] p-1 scroll-thin sm:w-fit">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.key ? `${basePath}?${param}=${t.key}` : basePath}
          className={clsx("whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors", current === t.key ? "bg-star-500 font-semibold text-space-950" : "text-fg-muted hover:text-white")}
        >
          {t.label}{typeof t.count === "number" ? ` (${t.count})` : ""}
        </Link>
      ))}
    </div>
  );
}

export function Table({ columns, children, empty }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto scroll-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-fg-subtle">
              {columns.map((c) => <th key={c} className="px-4 py-3 font-medium">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">{children}</tbody>
        </table>
      </div>
      {empty && <p className="px-4 py-10 text-center text-sm text-fg-muted">{empty}</p>}
    </Card>
  );
}
