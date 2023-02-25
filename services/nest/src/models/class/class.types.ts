import { z } from 'zod';

export const classCreateSchema = z.object({
  data: z.object({
    number: z.number(),
    max_population: z.number(),
  }),
});

export const classUpdateSchema = classCreateSchema.deepPartial();

export type classesWithSubjectsDto = {
  id: string;
  number: number;
  max_population: number;
  ClassSubject?: [
    {
      class_id: string;
      subject_id: string;
      subject?: {
        id: string;
        name: string;
        points: number;
      };
    },
  ];
}[];

export type mappedClassesWithSubjects = {
  id: string;
  number: number;
  max_population: number;
  subjects: {
    id: string;
    name: string;
    points: number;
  }[];
}[];

export type classType = {
  data: {
    number: number;
    max_population: number;
  };
};
