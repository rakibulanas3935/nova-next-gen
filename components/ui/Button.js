import Link from "next/link";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-r from-[#9333ea] to-[#3b82f6] text-white hover:from-[#a855f7] hover:to-[#60a5fa] shadow-[0_10px_30px_-10px_rgba(147,51,234,0.7)] font-semibold",
  secondary:
    "glass text-fg hover:border-line-strong hover:bg-white/[0.06]",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/5",
  danger: "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
  sky: "bg-sky-500 text-white hover:bg-sky-400 font-semibold",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-13 px-7 text-base gap-2.5 rounded-xl",
  icon: "h-10 w-10 rounded-lg justify-center",
};

export default function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled,
  children,
  ...props
}) {
  const cls = clsx(
    "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ring-focus select-none",
    "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  const Tag = as || "button";
  return (
    <Tag className={cls} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </Tag>
  );
}
