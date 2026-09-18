import clsx from "clsx";

const base =
  "w-full rounded-xl border border-line bg-white/[0.04] px-4 text-fg placeholder:text-fg-subtle transition-colors ring-focus focus:border-sky-500/60 focus:bg-white/[0.06] disabled:opacity-50";

export function Field({ label, hint, error, htmlFor, required, children, className }) {
  return (
    <div className={clsx("space-y-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-fg">
          {label} {required && <span className="text-star-500">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-fg-subtle">{hint}</p>}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function Input({ className, ...props }) {
  return <input className={clsx(base, "h-11", className)} {...props} />;
}

export function Textarea({ className, rows = 5, ...props }) {
  return <textarea rows={rows} className={clsx(base, "py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <select className={clsx(base, "h-11 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2398a4bd%22 stroke-width=%222%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10", className)} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={clsx("inline-flex cursor-pointer items-center gap-2.5 text-sm text-fg", className)}>
      <input type="checkbox" className="h-4 w-4 rounded border-line bg-white/5 accent-star-500 ring-focus" {...props} />
      {label}
    </label>
  );
}
