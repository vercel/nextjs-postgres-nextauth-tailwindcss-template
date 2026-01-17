import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  location: string;
  review: string;
  rating: number;
  avatar?: string;
}

export function TestimonialCard({
  name,
  role,
  location,
  review,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-border bg-card">
      <CardContent className="pt-6">
        {/* Avatar y Stars */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              name.charAt(0)
            )}
          </div>

          {/* Nombre y Stars */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted-foreground"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Quote */}
        <blockquote className="text-muted-foreground leading-relaxed mb-4">
          "{review}"
        </blockquote>

        {/* Role y Location */}
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{role}</span>
          <span className="mx-2">·</span>
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
