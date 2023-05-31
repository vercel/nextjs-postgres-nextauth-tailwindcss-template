import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
// TODO component
// @ts-ignore
const Auth = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  return children;
};

export default Auth;
