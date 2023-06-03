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
    .selectFrom('registro')
    .innerJoin('productos', 'registro.productoid', 'productos.id')
    .select(['registro.id', 'registro.cultivo', 'productos.nombre', 'registro.para', 'registro.fecha', 'registro.dosis', 'registro.siguiente', 'registro.aclaraciones'])
    .where('registro.cultivo', 'like', `%${search}%`)
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