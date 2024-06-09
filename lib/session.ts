// import { getIronSession } from 'iron-session';
// import { cookies } from 'next/headers';

// interface SessionContent {
//   id?: number;
// }

// export default function getSession() {
//   return getIronSession<SessionContent>(cookies(), {
//     cookieName: 'delicious-karrot',
//     password: process.env.COOKIE_PASSWORD!,
//   });
// }
import { getIronSession } from 'iron-session';
import { NextRequest } from 'next/server';

interface SessionContent {
  id?: number;
}

const sessionOptions = {
  cookieName: 'delicious-karrot',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.COOKIE_PASSWORD as string,
};

export default async function getSession(request: NextRequest) {
  return getIronSession<SessionContent>(request.cookies, sessionOptions);
}
