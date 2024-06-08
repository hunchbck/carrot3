import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import db from '@/lib/db';
import getSession from '@/lib/session';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
  });
  const { access_token, error } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch('https://api.github.com/user', {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const { avatar_url, id, login } = await userProfileResponse.json();
  const user = await db.c3User.findUnique({
    select: {
      id: true,
    },
    where: {
      github_id: id + '',
    },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect('/profile');
  }
  const newUser = await db.c3User.create({
    data: {
      avatar: avatar_url,
      github_id: id + '',
      username: login,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect('/profile');
}
