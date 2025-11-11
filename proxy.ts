import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC = [
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/icon",
  "/nl/opengraph-image",
  "/nl/opengraph-image.png",
  "/en/opengraph-image",
  "/en/opengraph-image.png",
  "/_next",
  "/assets",
  "/api",
];

// Check if it's a static file (has file extension)
function hasFileExtension(pathname: string): boolean {
  return /\.[a-z0-9]+$/i.test(pathname);
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();
  if (hasFileExtension(pathname)) return NextResponse.next();
  if (pathname.startsWith("/en") || pathname.startsWith("/nl"))
    return NextResponse.next();

  // One-time language redirect based on Accept-Language
  const langHeader = req.headers.get("accept-language") || "";
  const isEN = /^en\b/i.test(langHeader);
  const target = new URL(isEN ? "/en" : "/nl", req.url);
  return NextResponse.redirect(target);
}

export const config = {
  matcher: "/:path*",
};
