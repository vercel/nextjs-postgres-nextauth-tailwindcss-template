import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3';
type HeadingVariant = 'hero' | 'section' | 'impact';

interface LandingHeadingProps {
  /** HTML heading level */
  level?: HeadingLevel;
  /** Visual style variant */
  variant?: HeadingVariant;
  /** Text before the highlighted part */
  children: ReactNode;
  /** Highlighted text (rendered in primary color with bolder weight) */
  highlight?: string;
  /** Text after the highlighted part */
  suffix?: string;
  /** Optional id for aria-labelledby */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether highlight comes before children */
  highlightFirst?: boolean;
}

const variantStyles: Record<HeadingVariant, { base: string; highlight: string }> = {
  hero: {
    base: 'font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-normal',
    highlight: 'text-primary font-extrabold'
  },
  section: {
    base: 'font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.2] tracking-normal',
    highlight: 'text-primary font-bold'
  },
  impact: {
    base: 'font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-normal',
    highlight: 'text-primary font-extrabold'
  }
};

/**
 * LandingHeading - Títulos optimizados para la landing page
 *
 * Usa Zalando Sans Expanded con jerarquía de pesos:
 * - hero: H1 principal (font-bold → font-black en highlight)
 * - section: H2 de secciones (font-medium → font-bold en highlight)
 * - impact: H2 de alto impacto como Quote/CTA (font-bold → font-extrabold en highlight)
 *
 * @example
 * // Básico
 * <LandingHeading variant="section" highlight="Tallify">
 *   Controla tus finanzas con
 * </LandingHeading>
 *
 * @example
 * // Highlight primero
 * <LandingHeading variant="hero" highlight="Adiós Excel" highlightFirst>
 *   hola claridad financiera
 * </LandingHeading>
 */
export function LandingHeading({
  level = 'h2',
  variant = 'section',
  children,
  highlight,
  suffix,
  id,
  className,
  highlightFirst = false
}: LandingHeadingProps) {
  const Tag = level;
  const styles = variantStyles[variant];

  return (
    <Tag id={id} className={cn(styles.base, className)}>
      {highlightFirst && highlight && (
        <>
          <span className={styles.highlight}>{highlight}</span>{' '}
        </>
      )}
      {children}
      {!highlightFirst && highlight && (
        <>
          {' '}<span className={styles.highlight}>{highlight}</span>
        </>
      )}
      {suffix}
    </Tag>
  );
}
