import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import UsersTable from './table';

export const dynamic = 'force-dynamic',
  runtime = 'experimental-edge',
  preferredRegion = 'home';

export default async function IndexPage() {
  const users = await queryBuilder
    .selectFrom('users')
    .select(['id', 'name', 'username', 'email'])
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from an external API and automatically cached
        static.
      </Text>
      <Card marginTop="mt-6">
        {/* @ts-expect-error Server Component */}
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
