import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "nl"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Simple check for nl preference
  if (/(^|,|;)\s*(nl|nl-)/i.test(acceptLanguage)) {
    return "nl";
  }
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = getLocale(request);
  const url = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
