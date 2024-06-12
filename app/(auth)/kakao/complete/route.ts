import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import db from '@/lib/db';
import login from '@/lib/login';
import { socialToken, socialUser } from '@/lib/social';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code === null) {
    // code가 없을 때 로그인 페이지로 리다이렉션
    return redirect('/login');
  }

  try {
    const accessToken = await socialToken('kakao', code);
    const userProfile = await socialUser('kakao', accessToken.access_token);

    const user = await db.c3User.findUnique({
      select: {
        avatar: true,
        email: true,
        id: true,
        mobile: true,
        name: true,
        socialInfo: true,
      },
      where: {
        email: userProfile.kakao_account.email,
      },
    });

    if (!user) {
      // 새로운 사용자 생성
      const username = 'Kakao' + userProfile.id;
      const socialInfo = { Kakao: userProfile };
      const newUser = await db.c3User.create({
        data: {
          avatar: userProfile.properties.profile_image,
          email: userProfile.kakao_account.email,
          emailCertified: true,
          mobile: userProfile.kakao_account.phone_number,
          mobileCertified: true,
          name: userProfile.kakao_account.name,
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

      if (!socialInfo.Kakao) {
        socialInfo = { ...socialInfo, Kakao: userProfile };
        data = {
          ...data,
          emailCertified: true,
          socialInfo: JSON.stringify(socialInfo),
        };
      }
      if (!user.name) {
        data = {
          ...data,
          name: userProfile.kakao_account.name,
        };
      }
      if (!user.mobile) {
        data = {
          ...data,
          mobile: userProfile.kakao_account.phone_number,
          mobileCertified: true,
        };
      }
      if (!user.avatar) {
        data = {
          ...data,
          avatar: userProfile.properties.profile_image,
        };
      }

      await db.c3User.update({
        data,
        where: { id: user.id },
      });
      await login(user.id);
    }
  } catch (error) {
    console.error('Error during social login:', error);
    // 에러 발생 시 로그인 페이지로 리다이렉션
    return redirect('/login');
  }

  return redirect('/profile');
}
