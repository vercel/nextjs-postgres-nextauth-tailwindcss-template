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