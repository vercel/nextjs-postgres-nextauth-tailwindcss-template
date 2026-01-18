"use client";

import { Button } from "@/components/ui/button";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";

export type SuggestionsProps = ComponentProps<typeof ScrollArea> & {
  animated?: boolean;
};

export const Suggestions = ({
  className,
  children,
  animated = true,
  ...props
}: SuggestionsProps) => {
  // Add staggered animation delays to children
  const animatedChildren = animated
    ? Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<{ style?: React.CSSProperties; className?: string }>, {
            style: {
              ...((child as ReactElement<{ style?: React.CSSProperties }>).props.style || {}),
              animationDelay: `${index * 75}ms`,
            },
            className: cn(
              (child as ReactElement<{ className?: string }>).props.className,
              "animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
            ),
          });
        }
        return child;
      })
    : children;

  return (
    <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
      <div className={cn("flex w-max flex-nowrap items-center gap-2", className)}>
        {animatedChildren}
      </div>
      <ScrollBar className="hidden" orientation="horizontal" />
    </ScrollArea>
  );
};

export type SuggestionProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  style,
  ...props
}: SuggestionProps) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };

  return (
    <Button
      className={cn(
        "cursor-pointer rounded-full px-4 transition-all hover:scale-105 hover:shadow-md",
        "border-primary/30 hover:border-primary hover:bg-primary/5",
        className
      )}
      onClick={handleClick}
      size={size}
      style={style}
      type="button"
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
};
