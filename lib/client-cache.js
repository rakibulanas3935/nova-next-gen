"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const PUBLIC_API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1").replace(/\/$/, "");

const PREFIX = "ds:cache:";
const DEFAULT_TTL = 1000 * 60 * 60 * 24; // keep stale data a day; it's better than a blank page

export function readCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw);
    if (Date.now() - at > DEFAULT_TTL) return null;
    return { data, at };
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ data, at: Date.now() }));
  } catch {
    /* quota / private mode — ignore */
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Browser fetch against the public API with a timeout and a few retries
 *  (Render free dynos sleep and take ~30s to wake). */
export async function clientGet(path, { retries = 4, timeout = 12000 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i += 1) {
    try {
      const res = await fetch(`${PUBLIC_API}${path}`, { signal: AbortSignal.timeout(timeout) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      if (i < retries) await sleep(Math.min(8000, 1500 * 2 ** i));
    }
  }
  throw lastErr;
}

/**
 * Data hook with three sources, in order of preference:
 *   1. `initialData` rendered by the server (fresh, SEO-friendly)
 *   2. localStorage copy from a previous visit (instant, may be stale)
 *   3. live fetch from the browser with retries (wakes the API up)
 *
 * Returns { data, status: 'fresh' | 'cached' | 'loading' | 'error', refresh }.
 */
export function useCachedResource(key, path, initialData, { select = (x) => x, enabled = true } = {}) {
  const [state, setState] = useState(() =>
    initialData ? { data: select(initialData), status: "fresh" } : { data: null, status: "loading" }
  );
  const selectRef = useRef(select);
  selectRef.current = select;

  const refresh = useCallback(async () => {
    try {
      const json = await clientGet(path);
      writeCache(key, json);
      setState({ data: selectRef.current(json), status: "fresh" });
    } catch {
      setState((s) => (s.data ? { ...s, status: "cached" } : { data: null, status: "error" }));
    }
  }, [key, path]);

  useEffect(() => {
    if (!enabled) return;
    if (initialData) {
      writeCache(key, initialData);
      return;
    }
    const cached = readCache(key);
    if (cached) setState({ data: selectRef.current(cached.data), status: "cached" });
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  return { ...state, refresh };
}
