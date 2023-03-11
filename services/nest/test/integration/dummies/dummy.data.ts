export const dummyPersonCreate = {
  data: {
    username: 'dummyPersonUsername',
    password: 'dummyPersonPassword',
  },
};

export const dummyClassCreate = {
  data: {
    number: 420,
    max_population: 10,
  },
};

export const dummySubjectCreate = {
  data: {
    name: 'dummySubjectName',
    points: 69,
  },
};

export const dummyClassesWithSubjects = [
  {
    id: 'd379d73a-7958-44e4-ab59-0e4128f35295',
    number: 211,
    max_population: 20,
    created_at: '2023-03-11T13:52:59.455Z',
    updated_at: '2023-03-11T13:52:59.455Z',
    ClassSubject: [
      {
        class_id: 'd379d73a-7958-44e4-ab59-0e4128f35295',
        subject_id: '917d669d-ea51-4031-b7ef-25b1850bbd52',
        created_at: '2023-03-11T13:52:59.455Z',
        updated_at: '2023-03-11T13:52:59.455Z',
        subject: {
          id: '917d669d-ea51-4031-b7ef-25b1850bbd52',
          name: 'geography',
          points: 1,
          created_at: '2023-03-11T13:52:59.453Z',
          updated_at: '2023-03-11T13:52:59.453Z',
        },
      },
    ],
  },
  {
    id: '261133c7-c73c-4a7f-8199-548798dc0e97',
    number: 111,
    max_population: 15,
    created_at: '2023-03-11T13:52:59.457Z',
    updated_at: '2023-03-11T13:52:59.457Z',
    ClassSubject: [
      {
        class_id: '261133c7-c73c-4a7f-8199-548798dc0e97',
        subject_id: 'c3114bc1-1bfa-4f44-ba17-f199a6dc635c',
        created_at: '2023-03-11T13:52:59.457Z',
        updated_at: '2023-03-11T13:52:59.457Z',
        subject: {
          id: 'c3114bc1-1bfa-4f44-ba17-f199a6dc635c',
          name: 'math',
          points: 5,
          created_at: '2023-03-11T13:52:59.451Z',
          updated_at: '2023-03-11T13:52:59.451Z',
        },
      },
    ],
  },
];

export const dummySubjectsWithClasses = [
  {
    result: {
      id: '917d669d-ea51-4031-b7ef-25b1850bbd52',
      name: 'geography',
      points: 1,
      classes: [
        {
          id: 'd379d73a-7958-44e4-ab59-0e4128f35295',
          number: 211,
          created_at: '2023-03-11T14:19:21.154',
          updated_at: '2023-03-11T14:19:21.154',
          max_population: 20,
        },
      ],
    },
  },
  {
    result: {
      id: 'c3114bc1-1bfa-4f44-ba17-f199a6dc635c',
      name: 'math',
      points: 5,
      classes: [
        {
          id: '261133c7-c73c-4a7f-8199-548798dc0e97',
          number: 111,
          created_at: '2023-03-11T14:19:21.166',
          updated_at: '2023-03-11T14:19:21.166',
          max_population: 15,
        },
      ],
    },
  },
];
