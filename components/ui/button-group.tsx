import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

export interface ButtonGroupOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * ButtonGroup - Migrado a shadcn ToggleGroup
 *
 * Wrapper conveniente sobre ToggleGroup para mantener la API existente
 */
export function ButtonGroup({
  options,
  value,
  onChange,
  className
}: ButtonGroupProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => {
        if (newValue) onChange(newValue);
      }}
      className={cn('gap-0', className)}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="gap-2"
        >
          {option.icon}
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

/**
 * ButtonGroupText - Text element for use in button groups (AI Elements compatibility)
 */
export function ButtonGroupText({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
