'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Folder, CreditCard, Search as SearchIcon, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useGlobalSearch, type SearchResult } from '@/hooks/use-global-search';
import { formatCurrency } from '@/lib/utils/formatting';

/**
 * GlobalSearch - Command Palette estilo Wise/Linear
 */

interface GlobalSearchProps {
  data?: {
    expenses?: any[];
    incomes?: any[];
    categories?: any[];
    paymentMethods?: any[];
  };
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultContentProps {
  result: SearchResult;
}

function SearchResultContent({ result }: SearchResultContentProps) {
  const TypeIcon = {
    expense: TrendingDown,
    income: TrendingUp,
    category: Folder,
    'payment-method': CreditCard,
  }[result.type];

  const EntityIcon = result.icon
    ? ((LucideIcons as any)[result.icon] as React.ComponentType || TypeIcon)
    : TypeIcon;

  return (
    <>
      {/* Icon con mejor diseño */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-data-[selected=true]:scale-105"
        style={{
          backgroundColor: result.color ? `${result.color}20` : 'hsl(var(--muted))',
          color: result.color || 'hsl(var(--foreground))',
        }}
      >
        <EntityIcon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate group-data-[selected=true]:text-foreground">{result.title}</p>
        {result.subtitle && (
          <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
        )}
      </div>

      {/* Amount con badge */}
      {result.amount !== undefined && (
        <div
          className={cn(
            'text-sm font-semibold tabular-nums px-2.5 py-1 rounded-lg',
            result.type === 'expense'
              ? 'text-destructive bg-destructive/10'
              : 'text-success bg-success/10'
          )}
        >
          {result.type === 'expense' ? '-' : '+'}
          {formatCurrency(Math.abs(result.amount))}
        </div>
      )}
    </>
  );
}

function EmptyState({ hasQuery, t }: { hasQuery: boolean; t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
        {hasQuery ? (
          <SearchIcon className="h-7 w-7 text-muted-foreground" />
        ) : (
          <Sparkles className="h-7 w-7 text-primary" />
        )}
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-[240px]">
        {hasQuery ? t('noResults') : t('emptyQuery')}
      </p>
    </div>
  );
}

export function GlobalSearch({ data, isOpen, onClose }: GlobalSearchProps) {
  const t = useTranslations('pages.dashboard.navigation.search');
  const {
    query,
    setQuery,
    groupedResults,
    selectResult,
  } = useGlobalSearch({ data });

  const handleSelectResult = React.useCallback((result: SearchResult) => {
    selectResult(result);
    onClose();
  }, [selectResult, onClose]);

  const hasResults = groupedResults.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">{t('dialogTitle')}</DialogTitle>
        <Command className="rounded-2xl border-none bg-background">
          <CommandInput
            placeholder={t('placeholder')}
            value={query}
            onValueChange={setQuery}
            className="h-14 text-base"
          />

          <CommandList className="max-h-[400px] overflow-y-auto">
            {!hasResults && (
              <CommandEmpty>
                <EmptyState hasQuery={!!query} t={t} />
              </CommandEmpty>
            )}

            {groupedResults.map((group, groupIndex) => (
              <CommandGroup
                key={group.label}
                heading={group.label}
                className={cn(
                  "px-2",
                  groupIndex > 0 && "border-t pt-2"
                )}
              >
                {group.results.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => handleSelectResult(result)}
                    className="group flex items-center gap-3 px-3 py-3 min-h-[56px] rounded-xl cursor-pointer data-[selected=true]:bg-accent/80 transition-colors"
                  >
                    <SearchResultContent result={result} />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>

          {/* Footer mejorado */}
          <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-6 min-w-6 select-none items-center justify-center rounded-md border bg-background px-1.5 font-mono text-[10px] font-medium shadow-sm" aria-hidden="true">
                  ↑↓
                </kbd>
                <span>{t('navigate')}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-6 min-w-6 select-none items-center justify-center rounded-md border bg-background px-1.5 font-mono text-[10px] font-medium shadow-sm" aria-hidden="true">
                  ↵
                </kbd>
                <span>{t('select')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-6 select-none items-center justify-center rounded-md border bg-background px-2 font-mono text-[10px] font-medium shadow-sm" aria-hidden="true">
                ⌘K
              </kbd>
              <span>{t('toOpen')}</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

