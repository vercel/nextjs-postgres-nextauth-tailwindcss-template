import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import { Suspense } from 'react';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
    
        </Suspense>
        {children}
        <Analytics />
       
      </body>
    </html>
  );
}
