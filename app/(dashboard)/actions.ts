'use server';

import { deleteProductById, insertProduct } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}

export async function addProduct(data: any) {
	await insertProduct(data);
}
