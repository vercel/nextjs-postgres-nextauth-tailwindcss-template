import { TestimonialCard } from "./testimonial-card";
import { LandingHeading } from "@/components/ui/landing-heading";

const testimonials = [
  {
    name: "Ana Martínez",
    role: "Marketing Manager",
    location: "CDMX",
    rating: 5,
    review:
      "Antes gastaba horas en Excel. Con Tallify veo mi situación financiera en 5 segundos. El dashboard es hermoso y funcional.",
  },
  {
    name: "Carlos Ramírez",
    role: "Diseñador Freelance",
    location: "Guadalajara",
    rating: 5,
    review:
      "Los gastos recurrentes virtuales son un game-changer. Ya no olvido renovaciones de software. Proyecta mis próximos 2 meses perfectamente.",
  },
  {
    name: "Lupita González",
    role: "Estudiante",
    location: "Monterrey",
    rating: 5,
    review:
      "Simple sin ser simplista. No necesito ser contadora para entender mis finanzas. Y es gratis!",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-muted/40"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <LandingHeading
            id="testimonials-heading"
            variant="section"
            highlight="nuestros usuarios"
            className="mb-4"
          >
            Lo que dicen
          </LandingHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Historias reales de personas que transformaron su relación con el
            dinero
          </p>
        </div>

        {/* Desktop: Grid 3 columnas */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Mobile: Carrusel horizontal con snap scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 pb-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-none w-[85vw] snap-center"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
