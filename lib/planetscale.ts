import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
  id: Generated<number>;
  name: string;
  username: string;
  email: string;
}

interface Database {
  guestbook: User;
  // Could add users from NextAuth here
  // either manually or through an upcoming adapter
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
