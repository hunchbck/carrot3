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

// console.log('Session password:', process.env.COOKIE_PASSWORD);

if (!sessionOptions.password) {
  throw new Error('COOKIE_PASSWORD 환경 변수가 설정되지 않았습니다.');
}
export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), sessionOptions);
}
