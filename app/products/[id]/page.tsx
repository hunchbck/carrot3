import { UserIcon } from '@heroicons/react/24/solid';
import { revalidateTag, unstable_cache as nextCache } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToWon } from '@/lib/utils';

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.c3Product.findUnique({
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    where: {
      id,
    },
  });
  // fetch("https://api.com", {
  //   next: {
  //     revalidate: 60,
  //     tags: ["hello"],
  //   },
  // });
  return product;
}

const getCachedProduct = nextCache(getProduct, ['product-detail'], {
  tags: ['product-detail'],
});

async function getProductTitle(id: number) {
  const product = await db.c3Product.findUnique({
    select: {
      title: true,
    },
    where: {
      id,
    },
  });
  return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
  tags: ['product-title'],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(+params.id);
  return {
    title: product?.title,
  };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  const revalidate = async () => {
    'use server';
    revalidateTag('xxxx');
  };
  return (
    <div className="pb-40">
      <div className="relative aspect-square">
        <Image fill alt={product.title} className="object-cover" src={`${product.photo}/public`} />
      </div>
      <div className="flex items-center gap-3 border-b border-neutral-700 p-5">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image alt={product.user.username} height={40} src={product.user.avatar} width={40} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed bottom-0 flex w-full max-w-screen-sm items-center justify-between bg-neutral-800 p-5 pb-10">
        <span className="text-xl font-semibold">{formatToWon(product.price)}원</span>
        <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
          <Link href={'/home'}>Home</Link>
        </button>
        {isOwner ? (
          <form action={revalidate}>
            <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
              Revalidate title cache
            </button>
          </form>
        ) : null}
        {isOwner ? (
          <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
            <Link href={`/products/${id}/edit`}>Edit product</Link>
          </button>
        ) : null}
        {isOwner ? (
          <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
            <Link href={`/products/${id}/delete`}>Delete product</Link>
          </button>
        ) : null}
        <Link className="rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white" href={``}>
          채팅하기
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.c3Product.findMany({
    select: {
      id: true,
    },
  });
  return products.map(product => ({ id: product.id + '' }));
}
