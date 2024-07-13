'use server';

import { redirect } from 'next/navigation';

import db from '@/lib/db';
import getSession from '@/lib/session';

import { productSchema } from './schema';

export async function uploadProduct(formData: FormData) {
  const data = {
    description: formData.get('description'),
    photo: formData.get('photo'),
    price: formData.get('price'),
    title: formData.get('title'),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.c3Product.create({
        data: {
          description: result.data.description,
          photo: result.data.photo,
          price: result.data.price,
          title: result.data.title,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
      //redirect("/products")
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
      method: 'POST',
    },
  );
  const data = await response.json();
  return data;
}
