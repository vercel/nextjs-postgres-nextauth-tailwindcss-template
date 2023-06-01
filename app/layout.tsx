import './globals.css';

import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import Navbar from './navbar';

export const metadata = {
  title: 'FitoRegis',
  description:
    'Registro de datos fitosanitarios para el control de plagas y enfermedades en cultivos agrícolas.'
};

const RootLayout = async ({ children }: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();

  return (
    <html lang='en' className='h-full bg-gray-50'>
    <body className='h-full'>
    <Suspense fallback='...'>
      <Navbar user={session?.user} />
    </Suspense>
    {Boolean(session?.user) && children}
    </body>
    </html>
  );
};

export default RootLayout;