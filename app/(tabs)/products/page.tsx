// import ListProduct from '@/components/list-product';
import { Prisma } from '@prisma/client';

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
    </div>
  );
}
