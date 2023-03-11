import { z } from 'zod';

export const userCreateSchema = z
  .object({
    data: z.object({
      username: z.string().min(2).max(20),
      password: z.string().min(8).max(20),
    }),
  })
  .strict();

export const userUpdateSchema = userCreateSchema.deepPartial();

export type userType = {
  data: {
    username: string;
    password: string;
  };
};
