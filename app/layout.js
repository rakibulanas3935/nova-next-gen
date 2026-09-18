import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { SITE } from "@/lib/content";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap", weight: ["500", "600", "700"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${SITE.name} — Astronomy club`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  keywords: ["Deep Sky Society", "astronomy club", "stargazing", "astrophotography", "exoplanets", "learn astronomy", "telescope nights", "space science club"],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Astronomy club`,
    description: SITE.description,
    images: [{ url: "/gallery/sky-space-dark-galaxy.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.png", shortcut: "/logo.ico" },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#04060d", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${grotesk.variable}`}>
      <body>
        <div className="starfield" aria-hidden />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{ className: "!bg-space-800 !border !border-line !text-fg", duration: 4000 }}
        />
      </body>
    </html>
  );
}
