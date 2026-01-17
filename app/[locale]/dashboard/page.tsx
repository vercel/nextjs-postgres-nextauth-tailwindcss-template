import Link from 'next/link';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardQuickActions } from './dashboard-quick-actions';
import { getUser } from '@/lib/auth';
import {
  getMonthlySummary,
  getOverdueExpenses,
  getAttentionRequiredExpenses,
  getTopCategoriesByMonth,
  getNextMonthProjection,
  getCategoriesByUser
} from '@/lib/db';
import { DashboardKPIs } from './dashboard-kpis';
import { MonthlyComparisonCard } from './monthly-comparison-card';
import { AttentionRequiredWidget } from './attention-required-widget';
import { TopCategoriesChart } from './top-categories-chart';
import { getTranslations } from 'next-intl/server';
import { getUserCurrency } from '@/lib/utils/currency-helpers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const t = await getTranslations('pages.dashboard');
  const user = await getUser();

  if (!user) {
    const authT = await getTranslations('pages.login');
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">{authT('title')}</p>
        <Button className="mt-4" asChild>
          <Link href="/login">{authT('submitButton')}</Link>
        </Button>
      </div>
    );
  }

  // Obtener fecha actual
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  // Obtener moneda del usuario y datos en paralelo
  const [
    currency,
    currentMonthSummary,
    previousMonthSummary,
    overdueExpenses,
    attentionRequiredExpenses,
    topCategories,
    nextMonthProjection,
    categories
  ] = await Promise.all([
    getUserCurrency(),
    getMonthlySummary(user.id, currentYear, currentMonth),
    getMonthlySummary(user.id, previousYear, previousMonth),
    getOverdueExpenses(user.id),
    getAttentionRequiredExpenses(user.id, 7),
    getTopCategoriesByMonth(user.id, currentYear, currentMonth, 5),
    getNextMonthProjection(user.id),
    getCategoriesByUser(user.id)
  ]);

  const getMonthName = (month: number) => {
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    return t(`months.${monthKeys[month - 1]}`);
  };

  // Verificar si es el primer uso (sin datos)
  const isFirstTime = currentMonthSummary.expensesCount === 0 &&
                      previousMonthSummary.expensesCount === 0;

  if (isFirstTime) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in w-full max-w-full min-w-0">
        <div className="flex items-center justify-between w-full max-w-full min-w-0">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">{t('navigation.dashboard')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('emptyState.welcome')}
            </p>
          </div>
        </div>

        {/* Estado vacío con CTAs */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 animate-fade-in-up w-full max-w-full min-w-0" style={{ animationDelay: '0.03s' }}>
          <div className="rounded-lg border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('emptyState.description')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('emptyState.description')}
              </p>
              <Button asChild>
                <Link href="/dashboard/expenses">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('emptyState.cta')}
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('navigation.sections.income')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('emptyState.description')}
              </p>
              <Button variant="outline" asChild>
                <Link href="/dashboard/income">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {t('navigation.sections.income')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Guía rápida */}
        <div className="rounded-lg border bg-muted/50 p-6 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <h3 className="font-semibold mb-3">{t('emptyState.guide.title')}</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>{t('emptyState.guide.step1.description')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>{t('emptyState.guide.step2.description')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>{t('emptyState.guide.step3.description')}</span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-fade-in w-full max-w-full min-w-0">
      <div className="flex items-center justify-between w-full max-w-full min-w-0">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('navigation.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('summary.title', { month: getMonthName(currentMonth), year: currentYear })}
          </p>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="animate-fade-in-up w-full max-w-full min-w-0" style={{ animationDelay: '0.03s' }}>
        <DashboardKPIs
          currentMonth={currentMonthSummary}
          previousMonth={previousMonthSummary.expensesCount > 0 ? previousMonthSummary : null}
          overdueExpenses={overdueExpenses}
          currency={currency}
        />
      </div>

      {/* Comparativa Mensual */}
      <div className="animate-fade-in-up w-full max-w-full min-w-0" style={{ animationDelay: '0.05s' }}>
        <MonthlyComparisonCard
          previousMonth={previousMonthSummary.expensesCount > 0 ? previousMonthSummary : null}
          currentMonth={currentMonthSummary}
          nextMonthProjection={nextMonthProjection}
          currency={currency}
        />
      </div>

      {/* Grid de 2 columnas: Atención requerida y Top categorías */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 animate-fade-in-up w-full max-w-full min-w-0" style={{ animationDelay: '0.07s' }}>
        <AttentionRequiredWidget
          expenses={attentionRequiredExpenses}
          categories={categories}
          currency={currency}
          currentBalance={currentMonthSummary.balance}
        />

        <TopCategoriesChart
          categories={topCategories}
          monthName={getMonthName(currentMonth)}
          currency={currency}
        />
      </div>
    </div>
  );
}
