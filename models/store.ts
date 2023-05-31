import { Generated } from 'kysely/dist/esm';

export interface Product {
  id: Generated<number>;
  compound?: string;
  name: string;
  type?: string;
  group?: string,
  for?: string;
  dose?: string;
  when?: string;
  crop?: string;
  ps?: string;
}

export interface Registry {
  id: Generated<number>;
  product: Product;
  crop?: string;
  date?: Date;
  for?: string;
  dose?: string;
  next?: string;
}
