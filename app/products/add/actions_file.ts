'use server';

import fs from 'fs/promises';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import db from '@/lib/db';
import getSession from '@/lib/session';
//import { InitialProducts } from '@/app/(tabs)/products/page';

const productSchema = z.object({
  description: z.string({
    required_error: 'Description is required',
  }),
  photo: z.string({
    required_error: 'Photo is required',
  }),
  price: z.coerce.number({
    required_error: 'Price is required',
  }),
  title: z.string({
    required_error: 'Title is required',
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  // formData 유효성 검사
  if (!(formData instanceof FormData)) {
    throw new TypeError('Expected formData to be an instance of FormData');
  }

  const description = formData.get('description');
  const photo = formData.get('photo');
  const price = formData.get('price');
  const title = formData.get('title');

  if (!(description && photo && price && title)) {
    throw new Error('Missing required form data');
  }

  const data: {
    description: string,
    photo: FormDataEntryValue,
    photo: string,
    price: number,
    title: string,
  } = {
    description: description.toString(),
    photo,
    price: Number(price),
    title: title.toString(),
  };

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  } else {
    throw new TypeError('Photo must be an instance of File');
  }
  console.log(data);
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
