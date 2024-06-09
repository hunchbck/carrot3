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
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

const sessionOptions: SessionOptions = {
  cookieName: 'delicious-karrot',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.COOKIE_PASSWORD as string,
};

export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), sessionOptions);
}
