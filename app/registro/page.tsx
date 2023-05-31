import { Card, Text, Title } from '@tremor/react';
import RegistryTable from './table';
import Search from '../search';


const dataFormatter = (number: number) =>
  Intl.NumberFormat('es').format(number).toString();

export default function RegistryPage() {
  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Title>Registro</Title>
      <Text>
        Registro de tratamientos
      </Text>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <RegistryTable registry={[]} />
      </Card>
    </main>
  );
}
