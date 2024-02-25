import 'server-only';

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike } from 'drizzle-orm';

neonConfig.fetchConnectionCache = true;

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 })
});

export type SelectUser = typeof users.$inferSelect;

export async function getUsers(search: string, offset: number) {
  // Always search the full table, not per page
  if (search) {
    return await db
      .select()
      .from(users)
      .where(ilike(users.name, `%${search}%`))
      .limit(1000);
  }

  if (offset === null) {
    return [];
  }

  const filteredUsers = await db.select().from(users).limit(20).offset(offset);

  return filteredUsers;
}

export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
