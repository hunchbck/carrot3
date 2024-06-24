// eslint-disable-next-line @typescript-eslint/naming-convention
type SocialPlatform = 'github' | 'kakao';

export function socialStart(platform: SocialPlatform) {
  interface SocialInfo {
    baseUrl: string;
    params: {
      allow_signup?: string,
      client_id: string,
      redirect_uri?: string,
      response_type?: string,
      scope?: string,
    };
  }
  const social: Record<SocialPlatform, SocialInfo> = {
    github: {
      baseUrl: 'https://github.com/login/oauth/authorize',
      params: {
        allow_signup: 'false',
        client_id: process.env.GITHUB_CLIENT_ID ?? '',
        scope: 'read:user,user:email',
      },
    },
    kakao: {
      baseUrl: 'https://kauth.kakao.com/oauth/authorize',
      params: {
        client_id: process.env.KAKAO_CLIENT_ID ?? '', // Assuming this is correctly defined in your environment
        redirect_uri: 'http://localhost:3000/kakao/complete',
        response_type: 'code',
      },
    },
  };
  const platformDetails = social[platform];
  const formattedParams = new URLSearchParams(platformDetails.params).toString();
  const finalUrl = `${platformDetails.baseUrl}?${formattedParams}`;
  return finalUrl;
}

export async function socialToken(platform: SocialPlatform, code: string) {
  interface SocialInfo {
    tokenParams: {
      client_id: string,
      client_secret: string,
      code: string,
      grant_type?: string,
      redirect_uri?: string,
    };
    tokenUrl: string;
  }
  const social: Record<SocialPlatform, SocialInfo> = {
    github: {
      tokenParams: {
        client_id: process.env.GITHUB_CLIENT_ID ?? '',
        client_secret: process.env.GITHUB_CLIENT_SECRET ?? '',
        code,
      },
      tokenUrl: 'https://github.com/login/oauth/access_token',
    },
    kakao: {
      tokenParams: {
        client_id: process.env.KAKAO_CLIENT_ID ?? '',
        client_secret: process.env.KAKAO_CLIENT_SECRET ?? '',
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/kakao/complete',
      },
      tokenUrl: 'https://kauth.kakao.com/oauth/token',
    },
  };
  const platformDetails = social[platform];
  const accessTokenParams = new URLSearchParams(platformDetails.tokenParams).toString();
  const accessTokenURL = `${platformDetails.tokenUrl}?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
  });
  const accessToken = await accessTokenResponse.json();
  return accessToken;
}

export async function socialUser(
  platform: SocialPlatform,
  access_token: string,
  tokenUrl?: string,
) {
  interface TokenUrl {
    tokenUrl: string;
  }
  const social: Record<SocialPlatform, TokenUrl> = {
    github: {
      tokenUrl: 'https://api.github.com/user',
    },
    kakao: {
      tokenUrl: 'https://kapi.kakao.com/v2/user/me',
    },
  };
  const platformDetails = social[platform];
  const fetchUrl = tokenUrl ? tokenUrl : platformDetails.tokenUrl;
  const userProfileResponse = await fetch(fetchUrl, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userProfile = await userProfileResponse.json();
  return userProfile;
}
