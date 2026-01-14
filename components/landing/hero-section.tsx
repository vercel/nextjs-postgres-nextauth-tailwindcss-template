'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LandingHeading } from "@/components/ui/landing-heading";
import { Zap, RefreshCw, Mail, Gift } from "lucide-react";
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('pages.home.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="text-center lg:text-left animate-fade-in">
            <LandingHeading
              level="h1"
              variant="hero"
              id="hero-heading"
              highlight={t('headline.highlight')}
              highlightFirst
              className="max-w-4xl mx-auto lg:mx-0"
            >
              {t('headline.rest')}
            </LandingHeading>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-xl mx-auto lg:mx-0">
              {/* Gratis - Most important (Gold/Amber) */}
              <div className="group flex items-center gap-3 cursor-pointer transition-transform hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: 'hsl(45 93% 47% / 0.1)' }}
                >
                  <Gift
                    className="w-5 h-5 transition-all duration-300 group-hover:animate-bounce"
                    style={{ color: 'hsl(45 93% 47%)' }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-base font-medium transition-colors duration-300"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <span className="group-hover:text-[hsl(45_93%_47%)] transition-colors">{t('features.free')}</span>
                </span>
              </div>

              {/* Registro de gasto fácil (Primary Green) */}
              <div className="group flex items-center gap-3 cursor-pointer transition-transform hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: 'hsl(98 100% 70% / 0.1)' }}
                >
                  <Zap
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{ color: 'hsl(98 100% 70%)' }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-base font-medium transition-colors duration-300"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <span className="group-hover:text-[hsl(98_100%_70%)] transition-colors">{t('features.quick')}</span>
                </span>
              </div>

              {/* Gastos recurrentes (Blue) */}
              <div className="group flex items-center gap-3 cursor-pointer transition-transform hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: 'hsl(220 89% 61% / 0.1)' }}
                >
                  <RefreshCw
                    className="w-5 h-5 transition-all duration-500 group-hover:rotate-180"
                    style={{ color: 'hsl(220 89% 61%)' }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-base font-medium transition-colors duration-300"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <span className="group-hover:text-[hsl(220_89%_61%)] transition-colors">{t('features.recurring')}</span>
                </span>
              </div>

              {/* Alertas por email (Purple) */}
              <div className="group flex items-center gap-3 cursor-pointer transition-transform hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: 'hsl(280 83% 63% / 0.1)' }}
                >
                  <Mail
                    className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                    style={{ color: 'hsl(280 83% 63%)' }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-base font-medium transition-colors duration-300"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <span className="group-hover:text-[hsl(280_83%_63%)] transition-colors">{t('features.alerts')}</span>
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
