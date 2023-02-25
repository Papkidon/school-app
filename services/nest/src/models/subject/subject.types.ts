import { z } from 'zod';

export const subjectCreateSchema = z.object({
  data: z.object({
    name: z.string(),
    points: z.number(),
  }),
});

export const subjectUpdateSchema = subjectCreateSchema.deepPartial();

export type subjectsWithClassesDto = {
  result: {
    id: string;
    name: string;
    classes: {
      id: string;
      number: string;
      max_population: number;
    }[];
  };
}[];

export type mappedSubjectsWithClassesDto = {
  id: string;
  name: string;
  classes: { id: string; number: string; max_population: number }[];
}[];

export type subjectType = {
  data: {
    name: string;
    points: number;
  };
};
