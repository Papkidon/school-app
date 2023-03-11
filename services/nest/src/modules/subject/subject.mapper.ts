import {
  mappedSubjectsWithClassesDto,
  subjectsWithClassesDto,
} from '../../models/subject/subject.types';

export const mapSubjectsWithClasses = (
  subjects: subjectsWithClassesDto,
): mappedSubjectsWithClassesDto => {
  if (!subjects.length) return [];
  return subjects.map((subject) => {
    return {
      ...subject.result,
    };
  });
};
