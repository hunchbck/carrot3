'use server';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';

const checkUsername = (username: string) => !username.includes('potato');
const checkPasswords = ({
  confirm_password,
  password,
}: {
  confirm_password: string;
  password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username???',
      })
      .trim()
      .toLowerCase()
      // .transform((username) => `🔥 ${username} 🔥`)
      .refine(checkUsername, 'No potatoes allowed!'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.c3User.findUnique({
      select: {
        id: true,
      },
      where: {
        username,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        fatal: true,
        message: 'This username is already taken',
        path: ['username'],
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.c3User.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        fatal: true,
        message: 'This email is already taken',
        path: ['email'],
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: 'Both passwords should be the same!',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    confirm_password: formData.get('confirm_password'),
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.c3User.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        username: result.data.username,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    //redirect("/profile");
    redirect('/home');
  }
}
