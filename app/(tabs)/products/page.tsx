// import ListProduct from '@/components/list-product';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

import ProductList from '@/components/product-list';
import db from '@/lib/db';

async function getInitialProducts() {
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
    take: 1,
  });
  return products;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products() {
  // const products = await getProducts();
  const initialProducts = await getInitialProducts();
  return (
    // <div className="flex flex-col gap-5 p-5">
    //   {products.map(product => (
    //     <ListProduct key={product.id} {...product} />
    //   ))}
    // </div>
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400"
        href="/products/add"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
