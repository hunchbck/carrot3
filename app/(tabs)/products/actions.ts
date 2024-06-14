'use server';

import db from '@/lib/db';

export async function getMoreProducts(page: number) {
  const products = await db.c3Product.findMany({
    orderBy: {
      created_at: 'desc',
    },
    select: {
      created_at: true,
      id: true,
      photo: true,
      price: true,
      title: true,
    },
    skip: page * 1,
    take: 1,
  });
  return products;
}
