import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Sell and buy all the things',
  title: {
    default: 'Karrot Market',
    template: '%s | Karrot Market',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto max-w-screen-sm bg-neutral-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
