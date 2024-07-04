// import ListProduct from '@/components/list-product';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { revalidatePath, unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';

import ProductList from '@/components/product-list';
import db from '@/lib/db';

const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

async function getInitialProducts() {
  // console.log('hit!!!!???');
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
  });
  return products;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export const metadata = {
  title: 'Home',
};

// export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Products() {
  // const products = await getProducts();
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    'use server';
    revalidatePath('/home');
  };
  return (
    // <div className="flex flex-col gap-5 p-5">
    //   {products.map(product => (
    //     <ListProduct key={product.id} {...product} />
    //   ))}
    // </div>
    <div>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400"
        href="/products/add"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
