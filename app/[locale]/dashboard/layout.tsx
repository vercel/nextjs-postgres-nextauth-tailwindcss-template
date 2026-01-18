import Link from 'next/link';
import {
  Home,
  FolderOpen,
  DollarSign,
  TrendingUp,
  PanelLeft,
  CreditCard,
  Settings,
  User,
  Shield,
  Download,
  Receipt,
  History,
  LogOut,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { signOut } from '@/lib/auth-actions';
import { Logo } from '@/components/ui/logo';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { NavSection } from './nav-section';
import { MobileNavBottom } from '@/components/mobile-nav-bottom';
import { getCategoriesByUser, getPaymentMethodsByUser, getExpensesByUser, getIncomesByUser } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { getUserProfile, PLAN_LIMITS, type UserProfile } from '@/lib/profiles';
import { GlobalSearchProvider, GlobalSearchTrigger } from '@/components/global-search-provider';
import { getTranslations } from 'next-intl/server';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Obtener traducciones
  const t = await getTranslations('pages.dashboard');
  const brandT = await getTranslations('brand');

  // Obtener datos para Quick Add y búsqueda global
  const user = await getUser();
  const profile = await getUserProfile();
  const categories = user ? await getCategoriesByUser(user.id) : [];
  const paymentMethods = user ? await getPaymentMethodsByUser(user.id) : [];

  // Datos para búsqueda global
  const { expenses } = user ? await getExpensesByUser(user.id, { limit: 100 }) : { expenses: [] };
  const incomes = user ? await getIncomesByUser(user.id) : [];

  const searchData = {
    expenses,
    incomes,
    categories,
    paymentMethods
  };

  return (
    <Providers>
      <GlobalSearchProvider data={searchData}>
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
          <DesktopNav t={t} brandName={brandT('name')} user={user} profile={profile} />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-52 overflow-x-hidden">
            <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <MobileNav t={t} brandName={brandT('name')} user={user} profile={profile} />
              <div className="flex-1 flex justify-end sm:justify-center">
                <GlobalSearchTrigger />
              </div>
            </header>
            <main className="grid flex-1 items-start gap-2 p-3 pb-20 sm:p-4 sm:pb-0 sm:px-6 sm:py-0 md:gap-4 overflow-x-hidden">
              {children}
            </main>
          </div>
          <MobileNavBottom />

          <Analytics />
        </main>
      </GlobalSearchProvider>
    </Providers>
  );
}

function DesktopNav({ t, brandName, user, profile }: { t: any; brandName: string; user: any; profile: UserProfile | null }) {
  const expenseLinks = [
    { href: '/dashboard/expenses', label: t('navigation.expense.all'), icon: "Receipt" as const },
    { href: '/dashboard/categories', label: t('navigation.expense.categories'), icon: "FolderOpen" as const },
    { href: '/dashboard/payment-methods', label: t('navigation.expense.paymentMethods'), icon: "CreditCard" as const },
    { href: '/dashboard/expenses/recurring', label: t('navigation.expense.recurring'), icon: "Receipt" as const },
    { href: '/dashboard/expenses/paid', label: t('navigation.expense.paid'), icon: "History" as const }
  ];

  const incomeLinks = [
    { href: '/dashboard/income', label: t('navigation.income.all'), icon: "TrendingUp" as const },
    { href: '/dashboard/income/categories', label: t('navigation.income.categories'), icon: "FolderOpen" as const },
    { href: '/dashboard/income/recurring', label: t('navigation.income.recurring'), icon: "TrendingUp" as const }
  ];

  const profileLinks = [
    { href: '/dashboard/profile/settings', label: t('navigation.profile.settings'), icon: "Settings" as const },
    { href: '/dashboard/profile/account', label: t('navigation.profile.account'), icon: "User" as const },
    { href: '/dashboard/profile/security', label: t('navigation.profile.security'), icon: "Shield" as const },
    { href: '/dashboard/profile/export', label: t('navigation.profile.export'), icon: "Download" as const }
  ];

  const planName = profile ? PLAN_LIMITS[profile.plan].name : 'Plan Free';
  const userName = profile?.full_name ?? user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Usuario';
  const avatarUrl = profile?.avatar_url ?? user?.user_metadata?.avatar_url ?? '/placeholder-user.jpg';

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col bg-background sm:flex">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold min-h-[44px] py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Tallify - Ir al dashboard"
          >
            <Logo variant="icon" size={32} />
            <span className="text-lg">{brandName}</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Taly - AI Assistant */}
            <Link
              href="/dashboard/chat"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 mb-2 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors group"
            >
              <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium">Taly</span>
              <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">AI</span>
            </Link>

            <NavSection
              title={t('navigation.sections.expense')}
              icon="DollarSign"
              links={expenseLinks}
              defaultOpen={true}
              storageKey="nav-expense-open"
            />
            <NavSection
              title={t('navigation.sections.income')}
              icon="TrendingUp"
              links={incomeLinks}
              defaultOpen={false}
              storageKey="nav-income-open"
            />
          </nav>
        </div>

        {/* User Section - Bottom */}
        <div className="border-t p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors text-left">
                <Image
                  src={avatarUrl}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="rounded-full shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground">{planName}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {profileLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={signOut} className="w-full">
                  <button type="submit" className="flex w-full items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ t, brandName, user, profile }: { t: any; brandName: string; user: any; profile: UserProfile | null }) {
  const planName = profile ? PLAN_LIMITS[profile.plan].name : 'Plan Free';
  const userName = profile?.full_name ?? user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Usuario';
  const avatarUrl = profile?.avatar_url ?? user?.user_metadata?.avatar_url ?? '/placeholder-user.jpg';

  const profileLinks = [
    { href: '/dashboard/profile/settings', label: t('navigation.profile.settings') },
    { href: '/dashboard/profile/account', label: t('navigation.profile.account') },
    { href: '/dashboard/profile/security', label: t('navigation.profile.security') },
    { href: '/dashboard/profile/export', label: t('navigation.profile.export') }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">{t('navigation.toggleMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <SheetDescription className="sr-only">
          Navegación principal de la aplicación con acceso a todas las secciones
        </SheetDescription>
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex h-14 items-center px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold min-h-[44px] py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Tallify - Ir al dashboard"
            >
              <Logo variant="icon" size={32} />
              <span className="text-lg">{brandName}</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-auto py-2">
            <div className="grid gap-1 px-2 text-sm font-medium">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                {t('navigation.dashboard')}
              </Link>

              {/* Taly - AI Assistant */}
              <Link
                href="/dashboard/chat"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-primary/10 group"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Taly</span>
                <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">AI</span>
              </Link>

              {/* Sección Gasto */}
              <div className="mt-3 px-3 text-xs font-semibold uppercase text-muted-foreground">
                {t('navigation.sections.expense')}
              </div>
              <Link href="/dashboard/expenses" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <Receipt className="h-4 w-4" />
                {t('navigation.expense.all')}
              </Link>
              <Link href="/dashboard/categories" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <FolderOpen className="h-4 w-4" />
                {t('navigation.expense.categories')}
              </Link>
              <Link href="/dashboard/payment-methods" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <CreditCard className="h-4 w-4" />
                {t('navigation.expense.paymentMethods')}
              </Link>
              <Link href="/dashboard/expenses/recurring" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <Receipt className="h-4 w-4" />
                {t('navigation.expense.recurring')}
              </Link>
              <Link href="/dashboard/expenses/paid" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <History className="h-4 w-4" />
                {t('navigation.expense.paid')}
              </Link>

              {/* Sección Ingresos */}
              <div className="mt-3 px-3 text-xs font-semibold uppercase text-muted-foreground">
                {t('navigation.sections.income')}
              </div>
              <Link href="/dashboard/income" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <TrendingUp className="h-4 w-4" />
                {t('navigation.income.all')}
              </Link>
              <Link href="/dashboard/income/categories" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <FolderOpen className="h-4 w-4" />
                {t('navigation.income.categories')}
              </Link>
              <Link href="/dashboard/income/recurring" className="flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-muted-foreground hover:text-primary hover:bg-muted">
                <TrendingUp className="h-4 w-4" />
                {t('navigation.income.recurring')}
              </Link>
            </div>
          </nav>

          {/* User Section - Bottom */}
          <div className="border-t p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors text-left">
                  <Image
                    src={avatarUrl}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-muted-foreground">{planName}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="w-48">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={signOut} className="w-full">
                    <button type="submit" className="flex w-full items-center gap-2 text-destructive">
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

