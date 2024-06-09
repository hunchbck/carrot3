import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import db from '@/lib/db';
import login from '@/lib/login';
import { socialToken, socialUser } from '@/lib/social';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code === null) {
    // 여기서 적절한 처리를 해주어야 합니다. 예를 들어:
    // 리다이렉트를 통해 사용자를 에러 페이지나 로그인 페이지로 보낼 수 있습니다.
    return redirect('/login'); // 로그인 페이지 또는 에러 페이지로 리다이렉션
  }
  const accessToken = await socialToken('github', code);
  const access_token = accessToken.access_token;
  const userProfile = await socialUser('github', access_token);
  const userEmails = await socialUser(
    'github',
    access_token,
    'https://api.github.com/user/emails',
  );
  /*
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
    cache: "no-cache",
  });
  const userEmails: Email[] = await userEmailResponse.json();
*/
  interface Email {
    email: string; // Assuming there's also an 'email' field
    primary: boolean;
    verified: boolean;
  }
  const emailObj = userEmails.find(
    (email: Email) => email.primary === true && email.verified === true,
  );
  if (!emailObj) {
    return redirect('/login');
  }
  userProfile.email = emailObj.email;

  const user = await db.c3User.findUnique({
    select: {
      avatar: true,
      email: true,
      id: true,
      socialInfo: true,
    },
    where: {
      email: userProfile.email,
    },
  });

  if (!user) {
    const username = 'Github' + userProfile.id;
    const socialInfo = { Github: userProfile };
    const newUser = await db.c3User.create({
      data: {
        avatar: userProfile.avatar_url,
        email: userProfile.email,
        emailCertified: true,
        socialInfo: JSON.stringify(socialInfo),
        socialOnly: true,
        username,
      },
      select: {
        id: true,
      },
    });
    await login(newUser.id);
  } else {
    // Ensure socialInfo is a valid string before parsing
    let data = {};
    let socialInfo = user.socialInfo ? JSON.parse(user.socialInfo) : {};
    if (!('Github' in socialInfo)) {
      socialInfo = { ...socialInfo, Github: userProfile };
      data = {
        emailCertified: true,
        socialInfo: JSON.stringify(socialInfo),
      };
    }
    if (!user.avatar) {
      data = {
        ...data,
        avatar: userProfile.avatar_url,
      };
    }
    // Update the user record with the new socialInfo
    await db.c3User.update({
      data,
      where: { id: user.id },
    });
    await login(user.id);
  }
  return redirect('/profile');
}
