import type { Metadata } from "next";
import Image from "next/image";
import PageLayout from "@/components/layout/page-layout";
import { i18n, type LangKey } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE_VERSION } from "@/lib/constants";
import buildJsonLdFor from "@/lib/seo";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validLang = (["en", "nl"] as const).includes(lang as any) ? (lang as LangKey) : "en";
  const t = i18n[validLang];
  const imageVersion = OG_IMAGE_VERSION;

  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical: `${SITE_URL}/${validLang}`,
      languages: {
        nl: `${SITE_URL}/nl`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `${SITE_URL}/${validLang}`,
      siteName: t.profile.name,
      locale: t.seo.locale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/${validLang}/opengraph-image.png?v=${imageVersion}`,
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
      images: [
        {
          url: `${SITE_URL}/${validLang}/opengraph-image.png?v=${imageVersion}`,
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const validLang = (["en", "nl"] as const).includes(lang as any) ? (lang as LangKey) : "en";
  const t = i18n[validLang];
  const jsonLd = JSON.stringify(buildJsonLdFor(t));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageLayout
        heroWorkImage={
          <Image
            src="/martijn-portrait-work.png"
            alt={`${t.profile.name} professional portrait`}
            fill
            priority
            loading="eager"
            sizes="(min-width: 1024px) 388px, 100vw"
            className="object-contain object-bottom"
          />
        }
        heroLifeImage={
          <Image
            src="/martijn-portrait-life.png"
            alt={`${t.profile.name} personal portrait`}
            fill
            priority
            loading="eager"
            sizes="(min-width: 1024px) 388px, 100vw"
            className="object-contain object-bottom"
          />
        }
      />
    </>
  );
}
