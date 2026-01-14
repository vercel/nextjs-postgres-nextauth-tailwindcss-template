import { Heart, Clock, DollarSign } from "lucide-react";
import { LandingHeading } from "@/components/ui/landing-heading";

const benefits = [
  {
    icon: Heart,
    title: "Paz mental financiera",
    description:
      "Saber exactamente cuánto puedes gastar sin ansiedad. Sin sorpresas desagradables.",
    stats: "60% menos ansiedad financiera",
    color: "hsl(98 100% 70%)", // Verde vibrante
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description:
      "15 segundos para registrar un gasto vs 20 minutos en Excel. 30 horas ahorradas al año.",
    stats: "30 horas/año ahorradas",
    color: "hsl(220 89% 61%)", // Azul
  },
  {
    icon: DollarSign,
    title: "Ahorra dinero real",
    description:
      "Usuarios identifican $2,000-$4,000/mes en gastos innecesarios. $0 en recargos por olvidos.",
    stats: "~$4,000/mes identificados",
    color: "hsl(142 76% 55%)", // Verde
  },
];

export function ValuePropsSection() {
  return (
    <section
      className="py-20 bg-muted/30"
      aria-labelledby="benefits-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <LandingHeading
            id="benefits-heading"
            variant="section"
            highlight="Tallify"
            className="mb-4"
          >
            Lo que ganas con
          </LandingHeading>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="animate-fade-in-up bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${benefit.color}20`,
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: benefit.color }}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Stats */}
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${benefit.color}15`,
                    color: benefit.color,
                  }}
                >
                  {benefit.stats}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
