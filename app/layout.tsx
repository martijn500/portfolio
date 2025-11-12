
import "./globals.css";
import { Merriweather } from "next/font/google";
import { Geist } from "next/font/google";

// Use the `variable` option so we expose CSS variables for the fonts
// and avoid forcing a font-family on the entire `<html>` element.
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-geist-sans",
});

import type { Metadata, Viewport } from "next";
import { THEME_COLORS } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Martijn van der Wijst – Tech Lead UX & Design Systems",
  description: "UX specialist / Tech Lead UX – design systems, tokens, accessibility.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.lightBackground },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.darkBackground },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Keep theme and script logic on <html>, but attach the *variable* classes
    // for the fonts (they expose CSS variables). The globals.css already
    // uses those variables to apply different fonts to body/headings.
    <html suppressHydrationWarning className={`${geist.variable} ${merriweather.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var root=document.documentElement;var stored=localStorage.getItem("theme-preference");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var mode=stored==="light"||stored==="dark"?stored:"system";var isDark=mode==="dark"||(mode==="system"&&prefersDark);root.classList.toggle("dark",isDark);root.dataset.theme=mode;root.classList.add("theme-ready");}catch(error){}})();',
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}