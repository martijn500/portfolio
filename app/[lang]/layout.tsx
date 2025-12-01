import "../globals.css";
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
import { i18n, type LangKey } from "@/lib/i18n";
import { LanguageProvider } from "@/lib/context/language-context";
import { THEME_COLORS } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Martijn van der Wijst - Tech Lead UX & Design Systems",
  description: "UX specialist / Tech Lead UX - design systems, tokens, accessibility.",
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

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "nl" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["en", "nl"] as const).includes(lang as any) ? (lang as LangKey) : "en";
  const dictionary = i18n[validLang];
  const noscriptMsg = dictionary.noscript.message;

  return (
    // Keep theme and script logic on <html>, but attach the *variable* classes
    // for the fonts (they expose CSS variables). The globals.css already
    // uses those variables to apply different fonts to body/headings.
    <html
      lang={validLang}
      suppressHydrationWarning
      className={`${geist.variable} ${merriweather.variable}`}
    >
      <head>
        {/* Theme bootstrap (safe — wrapped in try/catch) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var root=document.documentElement;var stored=localStorage.getItem("theme-preference");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var mode=stored==="light"||stored==="dark"?stored:"system";var isDark=mode==="dark"||(mode==="system"&&prefersDark);root.classList.toggle("dark",isDark);root.dataset.theme=mode;root.classList.add("theme-ready");}catch(error){}})();',
          }}
        />
        <meta name="description" content={metadata.description ?? ""} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <LanguageProvider lang={validLang} dictionary={dictionary}>
          <noscript>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 text-center">
              {noscriptMsg}
            </div>
          </noscript>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
