'use client';

import { AlertCircle, TrendingDown, Calendar } from "lucide-react";
import Image from "next/image";
import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

const problemsConfig = [
  {
    key: 'doubt',
    icon: AlertCircle,
    color: "hsl(45 93% 47%)", // Amarillo
    image: "/images/problem-1-doubt.png",
  },
  {
    key: 'visibility',
    icon: TrendingDown,
    color: "hsl(0 72% 50%)", // Rojo
    image: "/images/problem-2-visibility.png",
  },
  {
    key: 'consequences',
    icon: Calendar,
    color: "hsl(280 83% 63%)", // Morado
    image: "/images/problem-3-consequences.png",
  },
];

export function ProblemSection() {
  const t = useTranslations('pages.home.problem');

  return (
    <section
      className="py-16 md:py-20 bg-muted/30"
      aria-labelledby="problem-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
            id="problem-heading"
            variant="section"
            highlight={t('headlineHighlight')}
            className="mb-4"
          >
            {t('headline')}
          </LandingHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {problemsConfig.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.key}
                className="group animate-fade-in-up bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
                  {/* Multi-layer gradient placeholder */}
                  <div
                    className="absolute inset-0 opacity-70 group-hover:opacity-80 transition-opacity"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, ${problem.color}20 0%, transparent 60%),
                        linear-gradient(120deg, ${problem.color}10 0%, transparent 50%, ${problem.color}08 100%),
                        radial-gradient(circle at 70% 70%, ${problem.color}15 0%, transparent 50%)
                      `,
                    }}
                  />

                  {/* Animated gradient blobs */}
                  <div className="absolute inset-0 opacity-25">
                    <div
                      className="absolute top-0 left-0 w-28 h-28 rounded-full blur-2xl animate-pulse"
                      style={{ backgroundColor: problem.color, animationDuration: '4s' }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-36 h-36 rounded-full blur-3xl animate-pulse"
                      style={{ backgroundColor: `${problem.color}90`, animationDuration: '5s', animationDelay: '1s' }}
                    />
                  </div>

                  {/* Small icon indicator */}
                  <div className="absolute top-4 right-4 opacity-40">
                    <Icon className="w-6 h-6" style={{ color: problem.color }} aria-hidden="true" />
                  </div>

                  {/* Image placeholder indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="w-14 h-14 mx-auto mb-2 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${problem.color}40` }}>
                        <svg className="w-7 h-7" style={{ color: `${problem.color}60` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium opacity-50" style={{ color: problem.color }}>
                        {t(`problems.${problem.key}.imageAlt`)}
                      </p>
                    </div>
                  </div>

                  {/* Uncomment when images are ready */}
                  {/* <Image
                    src={problem.image}
                    alt={t(`problems.${problem.key}.imageAlt`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`problems.${problem.key}.title`)}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    {t(`problems.${problem.key}.description`)}
                  </p>

                  {/* Highlight badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border"
                    style={{
                      backgroundColor: `${problem.color}10`,
                      borderColor: `${problem.color}30`,
                      color: problem.color,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: problem.color }} />
                    {t(`problems.${problem.key}.highlight`)}
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
