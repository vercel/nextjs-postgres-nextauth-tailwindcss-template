import './globals.css';
// Optimizado: solo pesos variables sin italic (~25KB menos)
import '@fontsource-variable/zalando-sans-expanded/wght.css';

import { Analytics } from '@vercel/analytics/react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen w-full flex-col font-sans antialiased">
        {children}
      </body>
      <Analytics />
    </html>
  );
}
