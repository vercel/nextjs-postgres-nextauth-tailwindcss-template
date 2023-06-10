import { Card, Flex, Text, Title } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';
import RegistryTable from './table';
import Search from '../search';
import NewButton from './new-button';


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
      <Flex>
        <div>
          <Title>Tratamientos</Title>
          <Text>Registro de tratamientos</Text>
        </div>
        <NewButton />
      </Flex>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <RegistryTable registry={registry} />
      </Card>
    </main>
  );
};

export default RegistryPage;