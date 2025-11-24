import { SITE_URL } from "./constants";

export function personJsonLd(t: any) {
  const sameAs: string[] = [];
  // attempt to collect social links from the i18n translation object
  if (t.hero?.workLinks) {
    t.hero.workLinks.forEach((l: any) => {
      if (
        typeof l.url === "string" &&
        (l.url.includes("linkedin.com") ||
          l.url.includes("github.com") ||
          l.url.includes("instagram.com"))
      ) {
        sameAs.push(l.url);
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.profile.name,
    url: SITE_URL,
    jobTitle: t.profile.role,
    description: t.seo?.description,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteJsonLd(t: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t.profile.name,
    url: SITE_URL,
    description: t.seo?.description,
  };
}

export function buildJsonLdFor(t: any) {
  const graph = [personJsonLd(t), websiteJsonLd(t)].filter(Boolean);
  return { "@context": "https://schema.org", "@graph": graph };
}

export default buildJsonLdFor;
