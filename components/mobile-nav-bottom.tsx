'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Home,
  DollarSign,
  FolderOpen,
  TrendingUp,
  CreditCard,
  MoreHorizontal,
  History,
  ChevronRight,
  Receipt,
  User,
  Settings,
  Shield,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';

export function MobileNavBottom() {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const t = useTranslations('pages.dashboard.navigation');

  // Items principales (3 máximo para mejor UX mobile)
  const primaryLinks = [
    { href: '/dashboard', label: t('home'), icon: Home },
    { href: '/dashboard/expenses', label: t('expenses'), icon: DollarSign }
  ];

  // Items secundarios en el menú "Más" - Agrupados por sección
  const moreLinks = [
    // Sección Gasto
    {
      section: t('sections.expense'),
      items: [
        {
          href: '/dashboard/categories',
          label: t('expense.categories'),
          icon: FolderOpen,
          description: t('descriptions.categories')
        },
        {
          href: '/dashboard/payment-methods',
          label: t('expense.paymentMethods'),
          icon: CreditCard,
          description: t('descriptions.paymentMethods')
        },
        {
          href: '/dashboard/expenses/recurring',
          label: t('expense.recurring'),
          icon: Receipt,
          description: t('descriptions.recurring')
        },
        {
          href: '/dashboard/expenses/paid',
          label: t('expense.paid'),
          icon: History,
          description: t('descriptions.paid')
        }
      ]
    },
    // Sección Ingresos
    {
      section: t('sections.income'),
      items: [
        {
          href: '/dashboard/income',
          label: t('income.all'),
          icon: TrendingUp,
          description: t('descriptions.income')
        },
        {
          href: '/dashboard/income/categories',
          label: t('income.categories'),
          icon: FolderOpen,
          description: t('descriptions.incomeCategories')
        },
        {
          href: '/dashboard/income/recurring',
          label: t('income.recurring'),
          icon: TrendingUp,
          description: t('descriptions.incomeRecurring')
        }
      ]
    },
    // Sección Perfil
    {
      section: t('sections.profile'),
      items: [
        {
          href: '/dashboard/profile/settings',
          label: t('profile.settings'),
          icon: Settings,
          description: t('descriptions.settings')
        },
        {
          href: '/dashboard/profile/account',
          label: t('profile.account'),
          icon: User,
          description: t('descriptions.account')
        },
        {
          href: '/dashboard/profile/security',
          label: t('profile.security'),
          icon: Shield,
          description: t('descriptions.security')
        },
        {
          href: '/dashboard/profile/export',
          label: t('profile.export'),
          icon: Download,
          description: t('descriptions.export')
        }
      ]
    }
  ];

  const handleMoreLinkClick = (href: string) => {
    setMoreOpen(false);
    router.push(href);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/98 backdrop-blur-xl shadow-2xl sm:hidden">
        {/* Active indicator - top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="grid grid-cols-3 gap-2 px-3 py-3">
          {/* Primary navigation items */}
          {primaryLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-2xl px-3 py-3 text-xs font-semibold transition-all duration-300',
                  'relative overflow-hidden',
                  isActive
                    ? 'text-primary scale-105 motion-reduce:scale-100 bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground active:scale-95 motion-reduce:active:scale-100 hover:bg-accent/50'
                )}
              >
                {/* Active indicator - animated background */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse motion-reduce:animate-none"
                        style={{ animationDuration: '3s' }} />
                )}

                <div
                  className={cn(
                    'relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 scale-110 motion-reduce:scale-100'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 transition-all duration-300',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                  )} />
                </div>

                <span className="relative leading-tight">{label}</span>
              </Link>
            );
          })}

          {/* "Más" button */}
          <button
            onClick={() => setMoreOpen(true)}
            aria-label="Ver más opciones"
            aria-expanded={moreOpen}
            className={cn(
              'flex flex-col items-center gap-2 rounded-2xl px-3 py-3 text-xs font-semibold transition-all duration-300',
              'relative',
              'text-muted-foreground hover:text-foreground active:scale-95 hover:bg-accent/50'
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300">
              <MoreHorizontal className="h-5 w-5" />
            </div>
            <span className="leading-tight">{t('more')}</span>
          </button>
        </div>
      </nav>

      {/* Sheet "Más" - Opciones secundarias mejorado */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="h-[480px] rounded-t-3xl">
          {/* Handle visual */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-muted-foreground/20 rounded-full" />

          <SheetHeader className="space-y-3 pt-2">
            <SheetTitle className="text-2xl">{t('moreOptions')}</SheetTitle>
            <SheetDescription className="text-base">
              {t('moreDescription')}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            {moreLinks.map((section) => (
              <div key={section.section}>
                {/* Section Header */}
                <div className="px-4 mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.section}
                  </h3>
                </div>

                {/* Section Items */}
                <div className="space-y-2">
                  {section.items.map(({ href, label, icon: Icon, description }) => {
                    const isActive = pathname === href;
                    return (
                      <button
                        key={href}
                        onClick={() => handleMoreLinkClick(href)}
                        aria-label={`${label}: ${description}`}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'w-full flex items-center gap-4 p-4 rounded-2xl min-h-[44px] transition-all duration-300',
                          'hover:bg-accent/80 active:scale-[0.97] motion-reduce:active:scale-100',
                          'border-2 border-transparent',
                          isActive
                            ? 'bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-primary/30 shadow-sm shadow-primary/20'
                            : 'hover:border-accent'
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300',
                            isActive
                              ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30'
                              : 'bg-muted group-hover:bg-muted/80'
                          )}
                        >
                          <Icon
                            className={cn(
                              'h-6 w-6 transition-transform duration-300',
                              isActive ? 'text-primary-foreground scale-110' : 'text-muted-foreground'
                            )}
                          />
                        </div>

                        <div className="flex-1 text-left">
                          <div
                            className={cn(
                              'font-semibold text-base mb-0.5 transition-colors',
                              isActive && 'text-primary'
                            )}
                          >
                            {label}
                          </div>
                          <div className="text-xs text-muted-foreground leading-relaxed">
                            {description}
                          </div>
                        </div>

                        <ChevronRight
                          className={cn(
                            'h-5 w-5 transition-all duration-300',
                            isActive
                              ? 'text-primary translate-x-1 motion-reduce:translate-x-0'
                              : 'text-muted-foreground group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer decorativo */}
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
