'use server';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import db from '@/lib/db';
import login from '@/lib/login';

const checkEmailExists = async (email: string) => {
  const user = await db.c3User.findUnique({
    select: {
      id: true,
    },
    where: {
      email,
    },
  });
  return Boolean(user);
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An account with this email does not exist.'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(PASSWORD_MIN_LENGTH),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.c3User.findUnique({
      select: {
        id: true,
        password: true,
      },
      where: {
        email: result.data.email,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx',
    );
    if (ok) {
      await login(user!.id);
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ['Wrong password.'],
        },
      };
    }
  }
}
