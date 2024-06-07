'use server';
import { z } from 'zod';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';

const formSchema = z
  .object({
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username???',
      })
      .trim()
      .toLowerCase()
      .transform(username => `🔥 ${username}`)
      .refine(username => !username.includes('potato'), 'No potatoes allowed!'),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Two passwords should be equal',
        path: ['confirm_password'],
      });
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    confirm_password: formData.get('confirm_password'),
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
