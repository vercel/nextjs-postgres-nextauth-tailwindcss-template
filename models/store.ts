import { Generated } from 'kysely/dist/esm';

export interface Product {
  id: Generated<number>;
  composicion?: string;
  nombre: string;
  tipo?: string;
  grupo?: string,
  para?: string;
  dosis?: string;
  cuando?: string;
  cultivo?: string;
  ps?: string;
  notas?: string;
}

export interface Treatment {
  id: Generated<number>;
  productoid: number;
  cultivo?: string;
  fecha?: string;
  para?: string;
  dosis?: string;
  siguiente?: string;
  aclaraciones?: string;
}

export interface Dictionary {
  id: Generated<number>;
  palabra: string;
  definicion?: string;
}

export interface TreatmentResponse extends Omit<Treatment, 'productoid'> {
  nombre: string;
}
