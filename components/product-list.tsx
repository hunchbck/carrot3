'use client';

import { useEffect, useRef, useState } from 'react';

import { getMoreProducts } from '@/app/(tabs)/products/actions';
import { InitialProducts } from '@/app/(tabs)/products/page';

import ListProduct from './list-product';

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setProducts(prev => [...prev, ...newProducts]);
            setPage(prev => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 1.0,
      },
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);
  console.log('page: ', page);
  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map(product => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage ? (
        <span
          className="mx-auto w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
          ref={trigger}
        >
          {isLoading ? '로딩 중' : 'Load more'}
        </span>
      ) : null}
    </div>
  );
}
