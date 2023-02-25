import { z } from 'zod';

export const adminCreateSchema = z.object({
  data: z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(8).max(20),
  }),
});

export const adminUpdateSchema = adminCreateSchema.deepPartial();

export type adminType = {
  data: {
    username: string;
    password: string;
  };
};
