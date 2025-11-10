import type { Metadata } from "next";
import PageLayout from "@/components/layout/page-layout";
import { i18n } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = i18n.en;
  
  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        'nl': `${SITE_URL}/nl`,
        'en': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `${SITE_URL}/en`,
      siteName: t.profile.name,
      locale: t.seo.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.title,
      description: t.seo.description,
    },
  };
}

export default function Page() {
  return <PageLayout lang="en" />;
}
