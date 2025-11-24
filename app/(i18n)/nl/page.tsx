import type { Metadata } from "next";
import PageLayout from "@/components/layout/page-layout";
import { i18n } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE_VERSION } from "@/lib/constants";
import buildJsonLdFor from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = i18n.nl;
  const imageVersion = OG_IMAGE_VERSION;

  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical: `${SITE_URL}/nl`,
      languages: {
        nl: `${SITE_URL}/nl`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `${SITE_URL}/nl`,
      siteName: t.profile.name,
      locale: t.seo.locale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/nl/opengraph-image.png?v=${imageVersion}`,
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [`${SITE_URL}/nl/opengraph-image.png?v=${imageVersion}`],
    },
  };
}

export default function Page() {
  const t = i18n.nl;
  const jsonLd = JSON.stringify(buildJsonLdFor(t));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageLayout lang="nl" />
    </>
  );
}
