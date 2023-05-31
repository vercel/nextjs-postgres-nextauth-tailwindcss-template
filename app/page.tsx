import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import ProductsTable from './table';

export default async function IndexPage({
                                          searchParams
                                        }: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const products = await queryBuilder
    .selectFrom('products')
    .select(['id', 'name', 'compound', 'type', 'group', 'for', 'dose', 'when', 'crop', 'ps'])
    .where('name', 'like', `%${search}%`)
    .execute();

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Title>Productos</Title>
      <Text>
        Listado de productos fitosanitarios
      </Text>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <ProductsTable products={products} />
      </Card>
    </main>
  );
}
