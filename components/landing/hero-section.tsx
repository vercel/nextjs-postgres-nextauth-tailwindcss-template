'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BarChart3, Eye, ShieldCheck, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('pages.home.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center justify-center rounded-full border border-border bg-card/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t('badge')}
            </div>

            <h1
              id="hero-heading"
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto lg:mx-0"
            >
              <span className="text-primary">{t('headline.highlight')}</span>{' '}
              {t('headline.rest')}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-xl mx-auto lg:mx-0">
              {/* Registro en segundos */}
              <div className="group flex items-center gap-3 transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary transition-all duration-300">
                  <Zap
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t('features.quick')}
                </span>
              </div>

              {/* Impacto real */}
              <div className="group flex items-center gap-3 transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary transition-all duration-300">
                  <Eye
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t('features.impact')}
                </span>
              </div>

              {/* Seguimiento sin juicio */}
              <div className="group flex items-center gap-3 transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary transition-all duration-300">
                  <ShieldCheck
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t('features.neutral')}
                </span>
              </div>

              {/* Balance real */}
              <div className="group flex items-center gap-3 transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary transition-all duration-300">
                  <BarChart3
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t('features.balance')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base font-semibold"
                aria-label={t('cta')}
              >
                <Link href="/login">{t('cta')}</Link>
              </Button>
            </div>
          </div>

          {/* Screenshot */}
          <div className="relative animate-fade-in-up lg:animate-fade-in-right">
            <div className="relative aspect-video rounded-xl border-2 border-border shadow-2xl overflow-hidden bg-card">
              <Image
                src="/screenshots/dashboard-light.png"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>

            {/* Decoración */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>

      {/* Pattern de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
