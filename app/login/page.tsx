'use client';

import { useFormState } from 'react-dom';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

import { logIn } from './actions';

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          required
          errors={state?.fieldErrors.email}
          name="email"
          placeholder="Email"
          type="email"
        />
        <Input
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
