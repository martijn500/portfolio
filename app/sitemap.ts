import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const lastmod = new Date().toISOString();
  return [
    {
      url: `${base}/nl`,
      lastModified: lastmod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/en`,
      lastModified: lastmod,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
