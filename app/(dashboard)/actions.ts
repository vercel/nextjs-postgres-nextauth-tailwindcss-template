'use server';

import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  // Uncomment this to enable deletion
  // await deleteProductById(id);
  // revalidatePath('/');
}
