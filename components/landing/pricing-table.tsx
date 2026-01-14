"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LandingHeading } from "@/components/ui/landing-heading";
import Link from "next/link";
import { useTranslations } from 'next-intl';

type BillingPeriod = "monthly" | "annual";

const pricingPlansConfig = [
  {
    key: 'free',
    price: "$0",
    href: "/registro",
    features: ['unlimitedExpenses', 'customCategories', 'paymentMethods', 'realBalance', 'clearDashboard', 'multiDevice'],
  },
  {
    key: 'pro',
    monthlyPrice: 14.99,
    annualPrice: 149.9,
    href: "/registro",
    popular: true,
    features: ['allFree', 'recurringExpenses', 'advancedFilters', 'monthlyComparison', 'lessFriction'],
  },
  {
    key: 'plus',
    monthlyPrice: 19.99,
    annualPrice: 199.9,
    href: "/registro",
    features: ['allPro', 'export', 'customReports', 'shareDashboard', 'multiCurrency'],
  },
];

export function PricingTable() {
  const t = useTranslations('pages.home.pricing');
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>("annual");

  const getPrice = (plan: typeof pricingPlansConfig[number]) => {
    if (plan.price) return { display: plan.price, period: "" };

    if (billingPeriod === "annual") {
      const monthlyEquivalent = plan.annualPrice! / 12;
      return {
        display: `$${monthlyEquivalent.toFixed(2)}`,
        period: t('perMonth'),
      };
    }

    return {
      display: `$${plan.monthlyPrice!.toFixed(2)}`,
      period: t('perMonth'),
    };
  };

  const getSavings = (plan: typeof pricingPlansConfig[number]) => {
    if (!plan.monthlyPrice || billingPeriod === "monthly") return null;
    const annualTotal = plan.annualPrice!;
    const monthlyTotal = plan.monthlyPrice! * 12;
    const savings = monthlyTotal - annualTotal;
    return t('savings', { amount: savings.toFixed(2) });
  };

  return (
    <section
      id="pricing"
      className="py-16 md:py-20 bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
            id="pricing-heading"
            variant="section"
            highlight={t('headlineHighlight')}
            className="mb-4"
          >
            {t('headline')}
          </LandingHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              aria-pressed={billingPeriod === "monthly"}
            >
              {t('billingPeriod.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === "annual"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              aria-pressed={billingPeriod === "annual"}
            >
              {t('billingPeriod.annual')}
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlansConfig.map((plan, index) => (
            <div
              key={plan.key}
              className={`relative animate-fade-in-up rounded-2xl p-8 ${
                plan.popular
                  ? "bg-card border-2 border-primary shadow-2xl scale-105"
                  : "bg-card border border-border shadow-lg"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                    {t(`plans.${plan.key}.popular`)}
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2 mt-2">
                {t(`plans.${plan.key}.name`)}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-foreground">
                    {getPrice(plan).display}
                  </span>
                  {getPrice(plan).period && (
                    <span className="text-lg text-muted-foreground">
                      {getPrice(plan).period}
                    </span>
                  )}
                </div>
                {getSavings(plan) && (
                  <p className="text-sm text-primary font-medium mt-1">
                    {getSavings(plan)}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                {t(`plans.${plan.key}.description`)}
              </p>

              {/* Features */}
              {plan.features && (
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{t(`plans.${plan.key}.features.${feature}`)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Micro-argument */}
              {plan.key === 'pro' && (
                <p className="text-sm text-foreground font-medium italic mb-6 p-3 bg-primary/5 rounded-lg border-l-2 border-primary whitespace-pre-line">
                  {t(`plans.${plan.key}.microArgument`)}
                </p>
              )}

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className={`w-full h-11 ${
                  plan.popular
                    ? ""
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Link href={plan.href}>{t(`plans.${plan.key}.cta`)} →</Link>
              </Button>

              {/* CTA Subtext */}
              {plan.key === 'free' && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {t(`plans.${plan.key}.ctaSubtext`)}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('footerNote')}
          </p>
        </div>
      </div>
    </section>
  );
}
