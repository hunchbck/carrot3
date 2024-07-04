'use client';

import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
      <button className="absolute right-5 top-5 text-neutral-200" onClick={onCloseClick}>
        <XMarkIcon className="size-10" />
      </button>
      <div className="flex h-1/2 w-full max-w-screen-sm justify-center">
        <div className="flex aspect-square items-center justify-center rounded-md bg-neutral-700 text-neutral-200">
          <PhotoIcon className="h-28" />
          {params.id}
        </div>
      </div>
    </div>
  );
}
