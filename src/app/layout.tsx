import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import {MSWComponent} from "@/app/_components/MSWComponent";
import AuthSession from '@/app/_components/AuthSession';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '번개오더 - 관리자',
  description: 'Thunder Order - Administrator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <body className={inter.className}>
        <MSWComponent />
        <AuthSession>
          {children}
        </AuthSession>
    </body>
    </html>
  )
}
