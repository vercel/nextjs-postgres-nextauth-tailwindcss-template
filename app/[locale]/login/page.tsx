'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signIn, signInWithMagicLink } from '@/lib/auth-actions';
import { Mail, Sparkles, KeyRound, Zap, Shield, TrendingUp, UserPlus } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/logo';

function LoginForm() {
  const t = useTranslations('pages.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for errors from URL params
  const urlError = searchParams.get('error');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Show optimistic feedback
        setIsRedirecting(true);
        // Redirect to dashboard - middleware will handle the rest
        router.push('/dashboard');
      }
    } catch (error) {
      setError(t('errors.signIn'));
      setIsLoading(false);
    }
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signInWithMagicLink(email);

      if (result.error) {
        setError(result.error);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      setError(t('errors.magicLink'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
              <Logo variant="icon" size={40} className="animate-pulse" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {t('redirecting.title')}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {t('redirecting.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse rounded-full" style={{ width: '100%' }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
              <Mail className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {t('emailSent.title')}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {t('emailSent.subtitle')}<br />
              <strong className="text-foreground">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('emailSent.instructions')} <strong className="text-foreground">{t('emailSent.expiresIn')}</strong>.
              </p>
            </div>
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full h-12 rounded-full"
            >
              {t('emailSent.sendAnother')}
            </Button>
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
          <p className="text-xl text-muted-foreground mb-8">
            {t('branding.description')}
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('branding.benefits.control.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('branding.benefits.control.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('branding.benefits.insights.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('branding.benefits.insights.description')}
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

      {/* Right Panel - Login Form */}
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

            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="password" className="gap-2 text-xs sm:text-sm">
                  <KeyRound className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('tabs.password')}</span>
                  <span className="sm:hidden">{t('tabs.passwordShort')}</span>
                </TabsTrigger>
                <TabsTrigger value="magic" className="gap-2 text-xs sm:text-sm">
                  <Sparkles className="h-4 w-4" />
                  {t('tabs.magicLink')}
                  <span className="ml-1 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full hidden sm:inline">
                    {t('tabs.recommended')}
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Password Login Tab */}
              <TabsContent value="password" className="space-y-4 mt-6">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-password" className="text-sm sm:text-base">
                      {t('emailLabel')}
                    </Label>
                    <Input
                      id="email-password"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                      autoFocus
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
                  </div>

                  <Button
                    type="submit"
                    className="h-12 sm:h-12 w-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {t('submitting')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5" />
                        {t('submitButton')}
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Magic Link Tab */}
              <TabsContent value="magic" className="space-y-4 mt-6">
                <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-magic" className="text-sm sm:text-base">
                      {t('emailLabel')}
                    </Label>
                    <Input
                      id="email-magic"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 sm:h-12 text-sm sm:text-base transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 sm:h-12 w-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {t('magicLink.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        {t('magicLink.submit')}
                      </span>
                    )}
                  </Button>
                </form>

                <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      {t('magicLink.howItWorks')}
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold text-sm">1.</span>
                      <span>{t('magicLink.step1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold text-sm">2.</span>
                      <span>{t('magicLink.step2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold text-sm">3.</span>
                      <span>{t('magicLink.step3')}</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('noAccount')}
                </span>
              </div>
            </div>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full h-12 rounded-full">
                <UserPlus className="h-4 w-4 mr-2" />
                {t('createAccount')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const t = useTranslations('pages.login');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{t('loading')}</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
