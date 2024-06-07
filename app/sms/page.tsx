'use client';

import { useFormState } from 'react-dom';

import Button from '@/components/button';
import Input from '@/components/input';

import { smsLogIn } from './actions';

const initialState = {
  error: undefined,
  token: false,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            required
            errors={state.error?.formErrors}
            key="tokenInput" // key 값 추가
            max={999999}
            min={100000}
            name="token"
            placeholder="Verification code"
            type="number"
          />
        ) : (
          <Input
            required
            errors={state.error?.formErrors}
            key="mobileInput" // key 값 추가
            name="phone"
            placeholder="Phone number"
            type="text"
          />
        )}
        <Button text={state.token ? 'Verify Token' : 'Send Verification SMS'} />
      </form>
    </div>
  );
}
