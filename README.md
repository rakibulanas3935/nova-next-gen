# Deep Sky Society — website (v2)

Next.js 15 (App Router) front end for the astronomy club. Talks to
[`deep-sky-server`](../deep-sky-server) (Express + MongoDB).

## Run locally

```bash
cp .env.local.example .env.local   # set API_URL, JWT_SECRET (same as the API)
npm install
npm run dev                        # http://localhost:3001
```

## How it's put together

| Folder | What lives there |
|---|---|
| `app/(site)` | Public pages + members area (Navbar/Footer layout) |
| `app/(dashboard)` | Admin dashboard (sidebar layout, admin-only) |
| `app/api/auth/*` | Login/signup/logout proxies that turn the API token into an httpOnly cookie |
| `lib/api.js` | Server-side fetch: ISR caching for public reads, Bearer forwarding for auth |
| `lib/actions/*` | Server Actions for every mutation (blog, events, projects, gallery, users…) |
| `lib/client-cache.js` | Browser fetch + localStorage cache + retry (covers Render cold starts) |
| `lib/astro.js`, `lib/content.js` | Moon phase / meteor showers / seasonal sky; static copy and learning tracks |
| `components/ui` | Design system: Button, Card, Badge, form fields, RichText (sanitised), motion |
| `middleware.js` | Verifies the session cookie (jose) and guards `/dashboard` + `/members` |

### Data flow

1. Server components call `apiGet()` — cached with `revalidate` + tags, so a
   sleeping API doesn't block a page that has rendered before.
2. Lists are client components that receive the server data as `initial`.
   If it's `null` (API down), they show the localStorage copy from the last
   visit and retry in the background.
3. Mutations go through Server Actions → Express with the cookie token, then
   `revalidateTag/Path` refreshes the cached pages.

### Auth

- Cookie `ds_token` (httpOnly, 7 days) holds the API JWT. The browser never
  sees the token.
- `middleware.js` verifies it with `JWT_SECRET` (must match the API) and
  redirects unauthenticated users to `/login?next=…`.
- Server pages use `getCurrentUser()` / `requireUser()` / `requireAdmin()`.

## Deploy

- Vercel: set `API_URL`, `NEXT_PUBLIC_API_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`.
- Add the site origin to `CORS_ORIGINS` on the API.
- `public/*.mp4` are leftovers from v1 (≈90 MB). Nothing references them
  any more — they can all be deleted.
