"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHeading } from "@/components/ui/landing-heading";
import { useTranslations } from 'next-intl';

const reviewsConfig = [
  { key: 'lucia', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia" },
  { key: 'martin', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Martin" },
  { key: 'sofia', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia" },
  { key: 'pablo', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pablo" },
  { key: 'carla', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla" },
  { key: 'andres', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres" },
  { key: 'diego', avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego" },
];

export function ReviewsSection() {
  const t = useTranslations('pages.home.reviews');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsConfig.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsConfig.length) % reviewsConfig.length);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible reviews (1 on mobile, 2 on tablet, 3 on desktop)
  const getVisibleReviews = () => {
    const visibleCount = 3; // Show 3 cards on desktop
    const reviews_to_show = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviewsConfig.length;
      reviews_to_show.push(reviewsConfig[index]);
    }
    return reviews_to_show;
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <LandingHeading
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

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevReview}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 bg-background shadow-lg hidden md:flex"
            aria-label="Review anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={nextReview}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 bg-background shadow-lg hidden md:flex"
            aria-label="Review siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Reviews Carousel */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {getVisibleReviews().map((review) => (
                <div
                  key={review.key}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all relative"
                >
                  {/* Quote Icon */}
                  <Quote
                    className="absolute top-6 right-6 w-8 h-8 text-primary/20"
                    aria-hidden="true"
                  />

                  {/* User Info with Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review.avatar}
                      alt={t(`items.${review.key}.name`)}
                      className="w-16 h-16 rounded-full border-2 border-primary/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">
                        {t(`items.${review.key}.name`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`items.${review.key}.city`)}
                      </p>
                    </div>
                  </div>

                  {/* Insight Badge */}
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 mb-4"
                  >
                    {t(`items.${review.key}.insight`)}
                  </Badge>

                  {/* Review Text */}
                  <p className="text-base text-foreground leading-relaxed italic">
                    "{t(`items.${review.key}.review`)}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {reviewsConfig.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir a review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
