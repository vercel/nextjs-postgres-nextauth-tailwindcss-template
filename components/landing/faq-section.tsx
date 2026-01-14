"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

const faqKeys = ['free', 'categories', 'bank', 'security', 'mobile', 'setup', 'export'];

export function FAQSection() {
  const t = useTranslations('pages.home.faq');

  return (
    <section
      className="py-16 md:py-20 bg-muted/30"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
            id="faq-heading"
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

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key, index) => (
              <AccordionItem
                key={key}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {t(`questions.${key}.q`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                  {t(`questions.${key}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
