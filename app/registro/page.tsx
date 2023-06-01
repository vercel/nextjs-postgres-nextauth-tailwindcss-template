import { Card, TableHeaderCell, Text, Title } from '@tremor/react';
import RegistryTable from './table';
import Search from '../search';
import { queryBuilder } from 'lib/planetscale';


const dataFormatter = (number: number) =>
  Intl.NumberFormat('es').format(number).toString();


const RegistryPage = async ({ searchParams }: {
  searchParams: { q: string };
}) => {
  const search = searchParams.q ?? '';
  const registry = await queryBuilder
    .selectFrom('registry')
    .innerJoin('products', 'registry.product', 'products.id')
    .select(['registry.id', 'registry.crop', 'products.name', 'registry.for', 'registry.date', 'registry.for', 'registry.dose', 'registry.next'])
    .where('registry.crop', 'like', `%${search}%`)
    .execute();

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Title>Registro</Title>
      <Text>
        Registro de tratamientos
      </Text>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <RegistryTable registry={registry} />
      </Card>
    </main>
  );
};

export default RegistryPage;