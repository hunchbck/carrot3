import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import db from '@/lib/db';
import login from '@/lib/login';
import { socialToken, socialUser } from '@/lib/social';

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code === null) {
    return redirect('/login');
  }

  try {
    const accessToken = await socialToken('github', code);
    const access_token = accessToken.access_token;
    const userProfile = await socialUser('github', access_token);

    // userEmails를 배열 형식으로 가져오기
    const userEmails = await socialUser(
      'github',
      access_token,
      'https://api.github.com/user/emails',
    );

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
      // 기존 사용자 업데이트
      let socialInfo = user.socialInfo ? JSON.parse(user.socialInfo) : {};
      let data: any = {};

      if (!socialInfo.Github) {
        socialInfo = { ...socialInfo, Github: userProfile };
        data = {
          ...data,
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
      await db.c3User.update({
        data,
        where: { id: user.id },
      });
      await login(user.id);
    }
  } catch (error) {
    console.error('소셜 로그인 중 오류 발생:', error);
    return redirect('/login');
  }

  return redirect('/profile');
}
