'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

type IconName = keyof typeof Icons;

interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

interface NavSectionProps {
  title: string;
  icon: IconName;
  links: NavLink[];
  defaultOpen?: boolean;
  storageKey: string;
}

export function NavSection({
  title,
  icon: iconName,
  links,
  defaultOpen = false,
  storageKey
}: NavSectionProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Mapear nombre del icono al componente
  const Icon = Icons[iconName] as React.ComponentType<{ className?: string }>;

  // Cargar estado desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      setIsOpen(stored === 'true');
    }
  }, [storageKey]);

  // Guardar estado en localStorage
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(storageKey, String(newState));
  };

  // Auto-expandir si algún link está activo
  useEffect(() => {
    const hasActiveLink = links.some((link) => pathname.startsWith(link.href));
    if (hasActiveLink && !isOpen) {
      setIsOpen(true);
    }
  }, [pathname, links, isOpen]);

  const hasActiveLink = links.some((link) => pathname.startsWith(link.href));

  return (
    <Collapsible open={isOpen} onOpenChange={handleToggle} className="mb-1">
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 min-h-[40px]',
          'text-muted-foreground transition-all hover:text-primary hover:bg-accent/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          hasActiveLink && 'text-primary bg-accent'
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left font-medium">{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1">
        <div className="ml-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-1.5 min-h-[36px]',
                  'text-sm transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
