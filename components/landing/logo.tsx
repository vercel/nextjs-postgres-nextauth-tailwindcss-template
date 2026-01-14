import Link from 'next/link';
import { Logo as LogoComponent } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2', className)}
      aria-label="Tallify - Ir a inicio"
    >
      <LogoComponent variant="full" size={36} />
    </Link>
  );
}
