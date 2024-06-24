'use client';

import {
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
} from '@heroicons/react/24/outline';
import {
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 mx-auto grid w-full max-w-screen-md grid-cols-5 border-t border-neutral-600 bg-neutral-800 px-5 py-3 *:text-white">
      <Link className="flex flex-col items-center gap-px" href="/products">
        {pathname === '/products' ? (
          <SolidHomeIcon className="h-7 w-7" />
        ) : (
          <OutlineHomeIcon className="h-7 w-7" />
        )}
        <span>홈</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/life">
        {pathname === '/life' ? (
          <SolidNewspaperIcon className="h-7 w-7" />
        ) : (
          <OutlineNewspaperIcon className="h-7 w-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/chat">
        {pathname === '/chat' ? (
          <SolidChatIcon className="h-7 w-7" />
        ) : (
          <OutlineChatIcon className="h-7 w-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/live">
        {pathname === '/live' ? (
          <SolidVideoCameraIcon className="h-7 w-7" />
        ) : (
          <OutlineVideoCameraIcon className="h-7 w-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/profile">
        {pathname === '/profile' ? (
          <SolidUserIcon className="h-7 w-7" />
        ) : (
          <OutlineUserIcon className="h-7 w-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
