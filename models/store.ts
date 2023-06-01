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
  product: number;
  crop?: string;
  date?: string;
  for?: string;
  dose?: string;
  next?: string;
}

export interface RegistryResponse extends Omit<Registry, 'product'> {
  name: string;
}
