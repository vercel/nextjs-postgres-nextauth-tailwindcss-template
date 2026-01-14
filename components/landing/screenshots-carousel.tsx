"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHeading } from "@/components/ui/landing-heading";

const screenshots = [
  {
    src: "/screenshots/dashboard-light.png",
    alt: "Dashboard de Tallify en modo claro mostrando KPIs y resumen financiero",
    title: "Dashboard Principal",
  },
  {
    src: "/screenshots/dashboard-dark.png",
    alt: "Dashboard de Tallify en modo oscuro con visualización de gastos",
    title: "Modo Oscuro",
  },
  {
    src: "/screenshots/expenses-view.png",
    alt: "Vista de gastos con agrupación temporal y filtros inteligentes",
    title: "Gestión de Gastos",
  },
  {
    src: "/screenshots/categories-grid.png",
    alt: "Grid de categorías coloridas con iconos personalizados",
    title: "Categorías",
  },
  {
    src: "/screenshots/quick-add-fab.png",
    alt: "Quick Add FAB abierto mostrando formulario rápido de gasto",
    title: "Quick Add",
  },
  {
    src: "/screenshots/mobile-navigation.png",
    alt: "Vista móvil con navegación inferior y lista de transacciones",
    title: "Vista Móvil",
  },
];

export function ScreenshotsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="screenshots"
      className="py-20"
      role="region"
      aria-label="Screenshots del producto"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <LandingHeading
            variant="section"
            highlight="Tallify"
            suffix=" en acción"
            className="mb-4"
          >
            Mira
          </LandingHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Interfaz moderna diseñada para claridad y velocidad
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 relative aspect-video"
                >
                  <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden border-2 border-border shadow-2xl">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Anterior screenshot"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Siguiente screenshot"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Ver ${screenshot.title}`}
                aria-current={index === selectedIndex ? "true" : "false"}
              />
            ))}
          </div>

          {/* Current Screenshot Title */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {screenshots[selectedIndex]?.title}
          </p>
        </div>
      </div>
    </section>
  );
}
