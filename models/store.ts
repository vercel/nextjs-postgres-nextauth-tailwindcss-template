import { Generated } from 'kysely/dist/esm';

export interface Product {
  id: Generated<number>;
  compuestos?: string;
  nombre: string;
  tipo?: string;
  grupo?: string,
  para?: string;
  dosis?: string;
  cuando?: string;
  cultivo?: string;
  ps?: string;
}

export interface Registry {
  id: Generated<number>;
  productoid: number;
  cultivo?: string;
  fecha?: string;
  para?: string;
  dosis?: string;
  siguiente?: string;
  aclaraciones?: string;
}

export interface RegistryResponse extends Omit<Registry, 'productoid'> {
  nombre: string;
}
