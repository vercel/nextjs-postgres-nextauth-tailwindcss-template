import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { SelectUser } from '@/lib/db';
import { Search } from './search';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; page: string };
}) {
  const search = searchParams.q ?? '';
  const users = await getUsers(search, 0);
  console.log('RSC users page', users.length);

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="w-full mb-2">
        <Search value={searchParams.q} />
      </div>
      <UsersTable
        users={users}
        search={search}
        action={async (initialState: {
          users: SelectUser[];
          offset: number;
        }) => {
          'use server';
          if (search) return initialState;

          const { offset } = initialState;
          const moreUsers = await getUsers(search, offset);

          console.log('Fetching more users...', moreUsers.length);

          return {
            users: [...initialState.users, ...moreUsers],
            offset: moreUsers.length >= 20 ? offset + 20 : null
          };
        }}
      />
    </main>
  );
}
