'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signUp } from '@/lib/auth-actions';
import { Mail, Zap, Shield, TrendingUp, ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/logo';

function SignUpForm() {
  const t = useTranslations('pages.register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for errors from URL params
  const urlError = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validaciones
    if (password !== confirmPassword) {
      setError(t('errors.passwordMismatch'));
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('errors.passwordTooShort'));
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password, fullName);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(t('errors.signUp'));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
              <Mail className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {t('success.title')}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {t('success.subtitle')}<br />
              <strong className="text-foreground">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {t('success.instructions')}
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>{t('success.note')}</strong> {t('success.noteText')}
              </p>
            </div>
            <Link href="/login" className="block">
              <Button variant="outline" className="w-full h-12">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('success.backToLogin')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Branding & Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-12 flex-col justify-center">
        <div className="max-w-md">
          <Link
            href="/"
            className="mb-8 inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Tallify - Ir a inicio"
          >
            <Logo variant="full" size={48} />
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {t('branding.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('branding.description')}
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('branding.benefits.free.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('branding.benefits.free.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('branding.benefits.noCard.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('branding.benefits.noCard.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('branding.benefits.secure.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('branding.benefits.secure.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="space-y-3 text-center pb-6">
            {/* Mobile logo */}
            <Link
              href="/"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Tallify - Ir a inicio"
            >
              <Logo variant="icon" size={32} />
            </Link>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {t('subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(error || urlError) && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center animate-shake">
                <p className="text-sm font-medium text-destructive">
                  {error || urlError}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm sm:text-base">
                  {t('nameLabel')}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  {t('emailLabel')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  {t('passwordLabel')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-muted-foreground">
                  {t('passwordHint')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
                  {t('confirmPasswordLabel')}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                className="h-12 sm:h-12 w-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {t('submitting')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    {t('submitButton')}
                  </span>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('hasAccount')}
                </span>
              </div>
            </div>

            <Link href="/login" className="block">
              <Button variant="outline" className="w-full h-12">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('login')}
              </Button>
            </Link>

            <p className="text-xs text-center text-muted-foreground">
              {t('terms')}{' '}
              <Link href="/terms" className="text-primary hover:underline">
                {t('termsLink')}
              </Link>{' '}
              {t('and')}{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                {t('privacyLink')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const t = useTranslations('pages.register');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{t('loading')}</p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignUpForm />
    </Suspense>
  );
}
