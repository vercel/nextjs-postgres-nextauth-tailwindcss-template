import './globals.css';
import '@tremor/react/dist/esm/tremor.css';

import Navbar from './navbar';
import AnalyticsWrapper from './analytics';
import { unstable_getServerSession } from 'next-auth/next';
import Toast from './toast';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Navbar user={session?.user} />
        {children}
        <AnalyticsWrapper />
        <Toast />
      </body>
    </html>
  );
}
