import { BarChart3, RefreshCw, Zap, Sparkles, Eye, TrendingUp } from "lucide-react";
import { FeatureCard } from "./feature-card";
import { LandingHeading } from "@/components/ui/landing-heading";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    description:
      "Ve tu situación financiera completa: gastos, ingresos, balance. En un solo vistazo. Responde '¿cómo estoy?' en 5 segundos.",
    iconColor: "hsl(220 89% 61%)", // Azul
  },
  {
    icon: RefreshCw,
    title: "Gastos Recurrentes",
    description:
      "Configura Netflix una vez, Tallify calcula automáticamente los próximos meses. Sin duplicar trabajo.",
    iconColor: "hsl(142 76% 55%)", // Verde
  },
  {
    icon: Zap,
    title: "Quick Add (10 segundos)",
    description:
      "Botón verde siempre visible. Click → 'Café $45' → Listo. Tan rápido que no hay excusa.",
    iconColor: "hsl(45 93% 47%)", // Amarillo/Dorado
  },
  {
    icon: Sparkles,
    title: "Búsqueda Instantánea",
    description:
      "Encuentra cualquier gasto en 3 segundos con Cmd+K. Sin scroll infinito. Sin frustración.",
    iconColor: "hsl(280 83% 63%)", // Morado
  },
  {
    icon: Eye,
    title: "100% Responsive",
    description:
      "Consulta desde tu celular en la tienda. Analiza en tu laptop en casa. Mobile-first, accesible para todos.",
    iconColor: "hsl(199 89% 48%)", // Cyan
  },
  {
    icon: TrendingUp,
    title: "Categorías Personalizables",
    description:
      "Organiza tus gastos como quieras. Ve en qué categoría gastas más. Descubre patrones y ahorra.",
    iconColor: "hsl(98 100% 70%)", // Verde Vibrante (primary)
  },
];

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="py-20 bg-muted/40"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <LandingHeading
            id="features-heading"
            variant="section"
            highlight="controlar tus finanzas"
            className="mb-4"
          >
            Todo lo que necesitas para
          </LandingHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Herramientas poderosas diseñadas para simplificar tu vida financiera
          </p>
        </div>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
