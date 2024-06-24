import { NextRequest, NextResponse } from 'next/server';

import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/create-account': true,
  '/github/complete': true,
  '/github/start': true,
  '/kakao/complete': true,
  '/kakao/start': true,
  '/login': true,
  '/sms': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
