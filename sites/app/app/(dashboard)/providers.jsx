'use client';
import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@easeful/components';

export default function Providers({ children, session
                                  }) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
