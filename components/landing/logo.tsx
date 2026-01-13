import { Logo as LogoComponent } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <LogoComponent variant="full" size={36} />
    </div>
  );
}
