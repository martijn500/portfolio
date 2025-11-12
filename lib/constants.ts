// Prefer canonical www host to avoid redirect chains that some scrapers don't follow
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.martijnvanderwijst.nl";

// Simple static OG image version. Bump this string when you want scrapers to fetch a new image.
export const OG_IMAGE_VERSION = "1";
