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
    .selectFrom('tratamientos')
    .innerJoin('productos', 'tratamientos.productoid', 'productos.id')
    .select(['tratamientos.id', 'tratamientos.cultivo', 'productos.nombre', 'tratamientos.para', 'tratamientos.fecha', 'tratamientos.dosis', 'tratamientos.siguiente', 'tratamientos.aclaraciones'])
    .where('tratamientos.cultivo', 'like', `%${search}%`)
    .orderBy('tratamientos.fecha', 'desc')
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