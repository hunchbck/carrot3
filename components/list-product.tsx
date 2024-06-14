import Image from 'next/image';
import Link from 'next/link';

import { formatToTimeAgo, formatToWon } from '@/lib/utils';

interface ListProductProps {
  created_at: Date;
  id: number;
  photo: string;
  price: number;
  title: string;
}

export default function ListProduct({ created_at, id, photo, price, title }: ListProductProps) {
  return (
    <Link className="flex gap-5" href={`/products/${id}`}>
      <div className="relative size-28 overflow-hidden rounded-md">
        {/* <Image fill alt={title} quality={100} src={photo} /> */}
        <Image fill alt={title} className="object-cover" src={photo} />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
