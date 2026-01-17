import Link from "next/link";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Logo } from "@/components/landing/logo";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSteps } from "@/components/landing/solution-steps";
import { ScreenshotsCarousel } from "@/components/landing/screenshots-carousel";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { QuoteSection } from "@/components/landing/quote-section";
import { PricingTable } from "@/components/landing/pricing-table";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { FooterLanding } from "@/components/landing/footer-landing";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const user = await getUser();
  const t = await getTranslations();

  // Si el usuario está autenticado, redirigir al dashboard
  if (user) {
    redirect("/dashboard");
  }

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tallify",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan with core features"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1"
    },
    description:
      "Gestiona tus gastos e ingresos, visualiza tu situación financiera en tiempo real. Gratis para siempre.",
    url: "https://tallify.com",
    screenshot: "https://tallify.com/screenshots/dashboard-light.png",
    featureList: [
      "Dashboard inteligente con KPIs en tiempo real",
      "Gastos recurrentes virtuales",
      "Quick Add en menos de 3 segundos",
      "Interfaz estilo Wise",
      "WCAG 2.1 AA accesible",
      "Sistema completo de ingresos"
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav
          className="container mx-auto flex h-16 items-center justify-between px-4"
          aria-label="Navegación principal"
        >
          <Logo />

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
            >
              {t('navigation.login')}
            </Link>
            <Button asChild size="default" className="h-12">
              <Link href="/login">{t('navigation.getStarted')}</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* 1. Hero - Problema en headline */}
        <HeroSection />

        {/* 2. Problema - Empatizar con el dolor */}
        <ProblemSection />

        {/* 3. Solución + Beneficios - 3 pasos con value props */}
        <SolutionSteps />

        {/* 4. Demo Visual - Screenshots */}
        <ScreenshotsCarousel />

        {/* 5. Comparación - Por qué Tallify */}
        <ComparisonSection />

        {/* 6. Quote - Lo que no se mide, se descontrola */}
        <QuoteSection />

        {/* 7. Pricing - 100% gratis sin trucos */}
        <PricingTable />

        {/* 8. Reviews - Prueba social */}
        <ReviewsSection />

        {/* 9. FAQ - Eliminar objeciones */}
        <FAQSection />

        {/* 10. CTA Final - Último empujón */}
        <CTASection />
      </main>

      {/* Footer */}
      <FooterLanding />
    </div>
  );
}
