'use server';

import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(id: number) {
  await deleteProductById(id);
  revalidatePath('/');
}
