'use server';

import { redirect } from 'next/navigation';
import validator from 'validator';
import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .refine(phone => validator.isMobilePhone(phone, 'ko-KR'), 'Wrong phone format');

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        error: result.error.flatten(),
        token: false,
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        error: result.error.flatten(),
        token: true,
      };
    } else {
      redirect('/');
    }
  }
}
