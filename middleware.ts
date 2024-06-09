import { getIronSession, SessionOptions } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

interface SessionContent {
  id?: number;
}

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
const sessionOptions: SessionOptions = {
  cookieName: 'delicious-karrot',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.COOKIE_PASSWORD as string,
};

if (!sessionOptions.password) {
  throw new Error('COOKIE_PASSWORD 환경 변수가 설정되지 않았습니다.');
}
export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const session = await getIronSession<SessionContent>(cookies, sessionOptions);
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
