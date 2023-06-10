import { Card, Title, Text, Flex } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import ProductsTable from './table';
import NewButton from './new-button';

export default async function IndexPage({
                                          searchParams
                                        }: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const products = await queryBuilder
    .selectFrom('productos')
    .select([
      'id',
      'nombre',
      'composicion',
      'tipo',
      'grupo',
      'para',
      'dosis',
      'cuando',
      'cultivo',
      'ps',
      'notas'
    ])
    .where('nombre', 'like', `%${search}%`)
    .orderBy('nombre', 'asc')
    .execute();

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Flex>
        <div>
          <Title>Productos</Title>
          <Text>Listado de productos fitosanitarios</Text>
        </div>
        <NewButton />
      </Flex>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <ProductsTable products={products} />
      </Card>
    </main>
  );
}
