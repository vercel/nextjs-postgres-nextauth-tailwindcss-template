'use client';

import { useFormState } from 'react-dom';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '@/lib/db';
import { useInfiniteScroll } from './infinite-scroll';
import { deleteUser } from './actions';

export function UsersTable({
  action,
  search,
  users
}: {
  action: any;
  search: string;
  users: SelectUser[];
}) {
  console.log('users table', users.length);
  const [state, formAction] = useFormState(action, {
    users,
    offset: 20
  });
  const filteredUsers = search ? users : state.users;
  const sentinelRef = useInfiniteScroll(formAction);

  return (
    <form>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Username</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div ref={sentinelRef} />
    </form>
  );
}

function UserRow({ user }: { user: SelectUser }) {
  const userId = user.id;
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteUserWithId}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
