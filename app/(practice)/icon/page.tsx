import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid'; // '@heroicons/react/16/solid'이 아니라 '@heroicons/react/24/solid'으로 수정
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
}

const IconButton: React.FC<ButtonProps> = ({ children, icon }) => {
  return (
    <button className="primary-btn flex items-center gap-2">
      {icon}
      {children}
    </button>
  );
};

const SomeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 13l4 4L19 7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            required
            className="h-10 w-full rounded-md border-none bg-transparent ring-1 ring-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Username"
            type="text"
          />
          <span className="font-medium text-red-500">Input error</span>
        </div>
        <IconButton icon={<SomeIcon />}>Create account</IconButton>
      </form>
      <div className="h-px w-full bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-2"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
