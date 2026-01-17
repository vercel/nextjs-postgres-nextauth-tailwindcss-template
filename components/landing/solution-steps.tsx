'use client';

import { Edit3, BarChart3, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

const stepsConfig = [
  {
    key: 'register',
    number: "1",
    icon: Edit3,
    color: "hsl(var(--primary))", // Verde vibrante - design token
    image: "/images/step-1-register.png",
  },
  {
    key: 'balance',
    number: "2",
    icon: BarChart3,
    color: "hsl(var(--info))", // Azul - design token
    image: "/images/step-2-balance.png",
  },
  {
    key: 'decide',
    number: "3",
    icon: CheckCircle2,
    color: "hsl(var(--success))", // Verde success - design token
    image: "/images/step-3-decide.png",
  },
];

export function SolutionSteps() {
  const t = useTranslations('pages.home.solution.steps');

  return (
    <section
      className="py-16 md:py-20 bg-background"
      aria-labelledby="solution-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
            id="solution-heading"
            variant="section"
            highlight={t('headlineHighlight')}
            className="mb-4"
          >
            {t('headline')}
          </LandingHeading>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stepsConfig.map((step, index) => {
            const Icon = step.icon;
            const isClimax = index === 2; // Paso 3 es el climax
            return (
              <div
                key={step.key}
                className={`group animate-fade-in-up bg-card border rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 relative ${
                  isClimax
                    ? 'border-2 border-success/50 ring-2 ring-success/20 shadow-lg'
                    : 'border-border'
                }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Number badge - Top center, responsive size - CLIMAX is bigger */}
                <div className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`flex items-center justify-center rounded-full font-heading font-extrabold shadow-lg border-4 bg-background group-hover:scale-110 transition-transform ${
                      isClimax
                        ? 'w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 text-3xl sm:text-4xl md:text-5xl'
                        : 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-2xl sm:text-3xl md:text-4xl'
                    }`}
                    style={{
                      borderColor: step.color,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden pt-8 sm:pt-10 md:pt-12 bg-gradient-to-br from-muted/50 to-muted/20 rounded-t-2xl">
                  {/* Image placeholder with gradient pattern */}
                  <div
                    className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity"
                    style={{
                      background: `
                        linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 50%, transparent 100%),
                        linear-gradient(45deg, transparent 30%, ${step.color}08 50%, transparent 70%),
                        radial-gradient(circle at 70% 30%, ${step.color}12 0%, transparent 60%)
                      `,
                    }}
                  />

                  {/* Geometric pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl"
                      style={{ backgroundColor: step.color }}
                    />
                    <div
                      className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-3xl"
                      style={{ backgroundColor: `${step.color}80` }}
                    />
                  </div>

                  {/* Small icon indicator */}
                  <div className="absolute bottom-4 right-4 opacity-40">
                    <Icon className="w-8 h-8" style={{ color: step.color }} aria-hidden="true" />
                  </div>

                  {/* Image placeholder text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${step.color}40` }}>
                        <svg className="w-8 h-8" style={{ color: `${step.color}60` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium opacity-60" style={{ color: step.color }}>
                        {t(`items.${step.key}.imageAlt`)}
                      </p>
                    </div>
                  </div>

                  {/* Uncomment when images are ready */}
                  {/* <Image
                    src={step.image}
                    alt={t(`items.${step.key}.imageAlt`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-6 rounded-b-2xl">
                  <h3 className={`font-heading font-bold text-foreground mb-2 ${isClimax ? 'text-2xl' : 'text-xl'}`}>
                    {t(`items.${step.key}.title`)}
                  </h3>

                  {isClimax && (
                    <p className="font-sans text-sm text-success font-semibold mb-2">
                      El momento que importa
                    </p>
                  )}

                  <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                    {t(`items.${step.key}.description`)}
                  </p>

                  {/* Benefit Badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    {t(`items.${step.key}.benefit`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
