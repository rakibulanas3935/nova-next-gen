import clsx from "clsx";

/*
 * Scroll-reveal without JavaScript. Uses CSS scroll-driven animations
 * (`animation-timeline: view()`) where supported; elsewhere the content is
 * simply visible. Nothing here is hidden in server HTML, so the page reads
 * fine before hydration, with JS disabled, and for crawlers.
 */

export function Reveal({ children, delay = 0, className, as: Tag = "div" }) {
  return (
    <Tag className={clsx("reveal", className)} style={delay ? { "--reveal-shift": `${delay * 10}%` } : undefined}>
      {children}
    </Tag>
  );
}

export function Stagger({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({ children, className, index = 0 }) {
  return (
    <div className={clsx("reveal", className)} style={{ "--reveal-shift": `${Math.min(index, 5) * 6}%` }}>
      {children}
    </div>
  );
}

/** Hero text that enters in sequence on load (plain CSS keyframes). */
export function HeroReveal({ children, delay = 0, className }) {
  return (
    <div className={clsx("animate-fade-up", className)} style={{ animationDelay: `${delay}s`, animationDuration: "0.9s" }}>
      {children}
    </div>
  );
}
