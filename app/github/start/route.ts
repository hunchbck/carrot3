import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    allow_signup: 'true',
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: 'read:user,user:email',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
