'use client';

import { Check, X } from "lucide-react";
import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

const comparisons = [
  {
    feature: "Registro de gasto",
    tallify: "10 segundos",
    notion: "~5 minutos (plantillas)",
    excel: "~20 minutos (fórmulas)",
    apps: "~1 minuto",
  },
  {
    feature: "Configuración inicial",
    tallify: "0 minutos",
    notion: "30+ minutos",
    excel: "60+ minutos",
    apps: "15 minutos",
  },
  {
    feature: "Enfocado en finanzas",
    tallify: true,
    notion: false,
    excel: false,
    apps: true,
  },
  {
    feature: "Balance real con recurrentes",
    tallify: true,
    notion: false,
    excel: "Manual",
    apps: false,
  },
  {
    feature: "Precio (funciones básicas)",
    tallify: "Gratis",
    notion: "$10/mes",
    excel: "Gratis*",
    apps: "$5-15/mes",
  },
  {
    feature: "Curva de aprendizaje",
    tallify: "0 días",
    notion: "~1 semana",
    excel: "~2 semanas",
    apps: "~2 días",
  },
  {
    feature: "Mobile-first",
    tallify: true,
    notion: false,
    excel: false,
    apps: true,
  },
  {
    feature: "Dashboard con KPIs",
    tallify: true,
    notion: "Personalizable",
    excel: "Manual",
    apps: "Básico",
  },
];

export function ComparisonSection() {
  const t = useTranslations('pages.home.comparison');

  return (
    <section
      className="py-16 md:py-20 bg-background"
      aria-labelledby="comparison-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
            id="comparison-heading"
            variant="section"
            highlight={t('headlineHighlight')}
            className="mb-4"
          >
            {t('headline')}
          </LandingHeading>
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground border-b border-border">
                  Característica
                </th>
                <th className="p-4 text-center border-b-2 border-primary bg-primary/5">
                  <div className="text-lg font-bold text-primary mb-1">
                    Tallify
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Esta herramienta
                  </div>
                </th>
                <th className="p-4 text-center text-sm font-semibold text-muted-foreground border-b border-border">
                  Notion
                </th>
                <th className="p-4 text-center text-sm font-semibold text-muted-foreground border-b border-border">
                  Excel
                </th>
                <th className="p-4 text-center text-sm font-semibold text-muted-foreground border-b border-border">
                  Apps Genéricas
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`animate-fade-in-up ${
                    index % 2 === 0 ? "bg-muted/20" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4 text-sm font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center bg-primary/5 border-l-2 border-r-2 border-primary">
                    {renderCell(row.tallify, true)}
                  </td>
                  <td className="p-4 text-center">
                    {renderCell(row.notion, false)}
                  </td>
                  <td className="p-4 text-center">
                    {renderCell(row.excel, false)}
                  </td>
                  <td className="p-4 text-center">
                    {renderCell(row.apps, false)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison Cards - Mobile */}
        <div className="md:hidden space-y-6">
          {comparisons.map((row, index) => (
            <div
              key={row.feature}
              className="bg-card border border-border rounded-xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <h3 className="text-base font-bold text-foreground mb-4">
                {row.feature}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary">
                  <span className="text-sm font-semibold text-primary">
                    Tallify
                  </span>
                  <span className="text-sm font-medium">
                    {renderCell(row.tallify, true)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Notion</span>
                  <span className="text-sm">{renderCell(row.notion, false)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Excel</span>
                  <span className="text-sm">{renderCell(row.excel, false)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">
                    Apps Genéricas
                  </span>
                  <span className="text-sm">{renderCell(row.apps, false)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * Excel es gratis si ya tienes Microsoft Office. Notion ofrece plan
            gratuito limitado. Apps genéricas varían en precio.
          </p>
        </div>
      </div>
    </section>
  );
}

function renderCell(
  value: string | boolean,
  isTallify: boolean
): React.ReactNode {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={`w-5 h-5 mx-auto ${
          isTallify ? "text-primary" : "text-success"
        }`}
      />
    ) : (
      <X className="w-5 h-5 text-destructive mx-auto" />
    );
  }

  return (
    <span
      className={`text-sm ${
        isTallify ? "font-semibold text-primary" : "text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
}
