import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

import { Product } from '../models';

interface User {
  id: Generated<number>;
  name: string;
  username: string;
  email: string;
}

interface Database {
  users: User;
  products: Product;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
