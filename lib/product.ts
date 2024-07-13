import { z } from "zod";

import db from "@/lib/db";

export const productSchema = z.object({
  description: z.string({
    required_error: "Description is required",
  }),
  photo: z.string({
    required_error: "Photo is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
});

// eslint-disable-next-line @typescript-eslint/naming-convention, prettier/prettier
export type ProductType = z.infer<typeof productSchema>;

interface User {
  avatar: string | null;
  username: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type Product = {
  created_at: Date;
  description: string;
  id: number;
  // Update this to use the User interface
  photo: string;
  price: number;
  title: string;
  updated_at: Date;
  user: User;
  userId: number;
};

export async function getProduct(id: string) {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return null;
  }
  const product = await db.product.findUnique({
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    where: {
      id: numericId,
    },
  });
  return product;
};

export async function getProductTitle(id: string) {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return null;
  }
  const product = await db.product.findUnique({
    select: {
      title: true,
    },
    where: {
      id: numericId,
    },
  });
  return product;
};