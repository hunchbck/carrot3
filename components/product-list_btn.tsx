'use client';

import { useState } from 'react';

import { getMoreProducts } from '@/app/(tabs)/home/actions';
import { InitialProducts } from '@/app/(tabs)/home/page';

import ListProduct from './list-product';

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage(prev => prev + 1);
      setProducts(prev => [...prev, ...newProducts]);
      setIsLoading(false);
    } else {
      setIsLastPage(true);
    }
  };
  console.log('page: ', page);
  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map(product => (
        <ListProduct key={product.id} {...product} />
      ))}
      {isLastPage ? (
        'No more items'
      ) : (
        <button
          className="mx-auto w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
          disabled={isLoading}
          onClick={onLoadMoreClick}
        >
          {isLoading ? '로딩 중' : 'Load more'}
        </button>
      )}
    </div>
  );
}
