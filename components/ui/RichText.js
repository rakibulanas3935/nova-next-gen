import clsx from "clsx";
import { cleanHtml } from "@/lib/sanitize";

/** Renders editor HTML safely. Server component — sanitised before it reaches the DOM. */
export default function RichText({ html, className }) {
  return (
    <div
      className={clsx("prose prose-invert prose-sky max-w-none prose-headings:font-display prose-a:no-underline hover:prose-a:underline", className)}
      dangerouslySetInnerHTML={{ __html: cleanHtml(html) }}
    />
  );
}
