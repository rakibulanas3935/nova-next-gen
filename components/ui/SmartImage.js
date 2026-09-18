"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const isRemoteAllowed = (src) =>
  /^https:\/\/(res\.cloudinary\.com|deep-sky-server\.onrender\.com|images\.unsplash\.com)\//.test(src || "");

/**
 * next/image with a graceful fallback: unknown hosts render a plain <img>,
 * broken URLs fall back to a nebula gradient so cards never look broken.
 */
export default function SmartImage({ src, alt = "", className, fill = true, sizes = "(max-width: 768px) 100vw, 33vw", priority, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={clsx(
          "absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_30%,rgba(139,116,245,0.35),transparent),radial-gradient(60%_60%_at_80%_80%,rgba(94,177,255,0.3),transparent),#0f172a]",
          className
        )}
        aria-hidden
      />
    );
  }

  if (src.startsWith("/") || isRemoteAllowed(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={clsx("object-cover", className)}
        onError={() => setFailed(true)}
        {...rest}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={clsx("absolute inset-0 h-full w-full object-cover", className)} onError={() => setFailed(true)} />;
}
