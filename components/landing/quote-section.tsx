'use client';

import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

export function QuoteSection() {
  const t = useTranslations('pages.home.quote');

  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <LandingHeading
            variant="impact"
            highlight={t('headlineHighlight')}
            suffix="."
          >
            {t('headline')}
          </LandingHeading>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6">
            {t('text')}
          </p>
        </div>
      </div>
    </section>
  );
}
