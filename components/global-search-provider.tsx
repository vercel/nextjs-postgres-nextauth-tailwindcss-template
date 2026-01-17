'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { GlobalSearch } from './global-search';

/**
 * GlobalSearchProvider - Proveedor de búsqueda global
 *
 * Envuelve la aplicación y proporciona el modal de búsqueda
 */

interface GlobalSearchContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const GlobalSearchContext = React.createContext<GlobalSearchContextValue | null>(null);

export function useGlobalSearchContext() {
  const context = React.useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearchContext must be used within GlobalSearchProvider');
  }
  return context;
}

interface GlobalSearchProviderProps {
  children: React.ReactNode;
  data?: {
    expenses?: any[];
    incomes?: any[];
    categories?: any[];
    paymentMethods?: any[];
  };
}

export function GlobalSearchProvider({ children, data }: GlobalSearchProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = React.useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen]
  );

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
      <GlobalSearch data={data} isOpen={isOpen} onClose={close} />
    </GlobalSearchContext.Provider>
  );
}

/**
 * GlobalSearchTrigger - Botón para abrir búsqueda
 */
export function GlobalSearchTrigger() {
  const { open } = useGlobalSearchContext();
  const t = useTranslations('pages.dashboard.navigation.search');

  return (
    <button
      onClick={open}
      className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 min-h-[44px] text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-80 sm:max-w-md"
      aria-label={t('ariaLabel')}
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="hidden sm:inline flex-1 text-left">{t('trigger')}</span>
      <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium" aria-hidden="true">
        ⌘K
      </kbd>
    </button>
  );
}
