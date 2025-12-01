"use client";
import { Eye, Layers, Accessibility } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import SectionHeading from "@/components/ui/section-heading";

export default function Principles() {
  const { t } = useLanguage();

  // Icon mapping for principles
  const iconMap = {
    Eye,
    Layers,
    Accessibility,
  } as const;

  return (
    <>
      <SectionHeading id="principles-heading">{t.principlesTitle}</SectionHeading>
      <div className="grid md:grid-cols-3 gap-6 mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
        {t.principles.map((p: { title: string; icon: string; description: string }) => {
          const IconComponent = iconMap[p.icon as keyof typeof iconMap];
          return (
            <div key={p.title} className="flex gap-4 pt-6">
              {/* Icon on the left */}
              <div className="shrink-0">
                <IconComponent className="h-6 w-6" aria-hidden="true" />
              </div>

              {/* Title and description stacked on the right */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
