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
    let data = {};
    // Ensure socialInfo is a valid string before parsing
    let socialInfo = user.socialInfo ? JSON.parse(user.socialInfo) : {};
    if (!('Kakao' in socialInfo)) {
      // Update the user record with the new socialInfo
      socialInfo = { ...socialInfo, Kakao: userProfile };
      data = {
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
  return redirect('/profile');
}
