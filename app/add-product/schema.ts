import { z } from "zod";

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
    required_error: "Title is required!!!!!",
  }),
});

// eslint-disable-next-line prettier/prettier
export type ProductProps = z.infer<typeof productSchema>;