import {
  classesWithSubjectsDto,
  mappedClassesWithSubjects,
} from '../../models/class/class.types';

export const mapClassesWithSubjects = (
  classes: classesWithSubjectsDto,
): mappedClassesWithSubjects => {
  if (!classes.length) return [];
  return classes.map((subject) => {
    return {
      id: subject.id,
      number: subject.number,
      max_population: subject.max_population,
      subjects: subject.ClassSubject.map((clas) => {
        return {
          id: clas.subject.id,
          name: clas.subject.name,
          points: clas.subject.points,
        };
      }),
    };
  });
};
