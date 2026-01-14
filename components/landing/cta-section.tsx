'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingHeading } from "@/components/ui/landing-heading";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations('pages.home.cta');

  return (
    <section className="relative py-20 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Headline */}
        <LandingHeading
          variant="impact"
          highlight={t('headlineHighlight')}
          className="mb-6 animate-fade-in"
        >
          {t('headline')}
        </LandingHeading>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
          {t('subtitle')}
        </p>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm sm:text-base">{t('benefits.setup')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm sm:text-base">{t('benefits.noCard')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm sm:text-base">{t('benefits.forever')}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <Button
            size="lg"
            asChild
            className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            aria-label={t('buttonAria')}
          >
            <Link href="/login">{t('button')}</Link>
          </Button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
