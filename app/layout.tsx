import "./globals.css";

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
    <html suppressHydrationWarning>
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