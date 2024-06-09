'use client';

import { useFormState } from 'react-dom';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

import { createAccount } from './actions';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex min-h-screen flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          required
          errors={state?.fieldErrors.username}
          maxLength={10}
          minLength={3}
          name="username"
          placeholder="Username"
          type="text"
        />
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
        <Input
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
        />
        <Input
          required
          errors={state?.fieldErrors.name}
          maxLength={20}
          minLength={4}
          name="name"
          placeholder="Name"
          type="text"
        />
        <Input
          required
          errors={state?.fieldErrors.mobile}
          name="mobile"
          placeholder="Mobile"
          type="text"
        />
        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
