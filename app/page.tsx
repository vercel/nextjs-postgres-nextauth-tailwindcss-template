import { Card, Title, Text } from '@tremor/react';
import UsersTable from './table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();

  return users;
}

export default async function IndexPage() {
  const users = await getUsers();

  return (
    <main className="p-4 md:p-10">
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
