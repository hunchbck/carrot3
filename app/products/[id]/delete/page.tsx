import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import { deleteImageFromCloudflare } from '@/lib/cloudflare';
import db from '@/lib/db';
import getIsOwner from '@/lib/owner';
import { getProduct } from '@/lib/product';

export default async function deleteProduct({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  if (!isOwner) {
    return redirect('/home');
  }
  await db.product.delete({
    where: {
      id: Number(id),
    },
  });
  if (product.photo) {
    const deleteResult = await deleteImageFromCloudflare(product.photo);
    if (!deleteResult.success) {
      console.error('Failed to delete old image:', deleteResult.error);
      // Optionally handle rollback or further error management
    }
  }
  await revalidatePath('/home');
  await revalidatePath(`/products/${id}`);
  redirect('/home');
}
