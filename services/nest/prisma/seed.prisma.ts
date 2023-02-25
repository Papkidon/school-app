import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'marek' },
    update: {},
    create: {
      username: 'marek',
      password: 'mario',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'tadek' },
    update: {},
    create: {
      username: 'tadek',
      password: 'tadeo',
    },
  });

  const admin1 = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin',
    },
  });

  const admin2 = await prisma.admin.upsert({
    where: { username: 'adek' },
    update: {},
    create: {
      username: 'adek',
      password: 'adek',
    },
  });

  const subject1 = await prisma.subject.upsert({
    where: { name: 'math' },
    update: {},
    create: {
      id: 'c3114bc1-1bfa-4f44-ba17-f199a6dc635c',
      name: 'math',
      points: 5,
    },
  });

  const subject2 = await prisma.subject.upsert({
    where: { name: 'geography' },
    update: {},
    create: {
      id: '917d669d-ea51-4031-b7ef-25b1850bbd52',
      name: 'geography',
      points: 1,
    },
  });

  const class1 = await prisma.class.upsert({
    where: { number: 211 },
    update: {},
    create: {
      id: 'd379d73a-7958-44e4-ab59-0e4128f35295',
      number: 211,
      max_population: 20,
      ClassSubject: {
        create: {
          subject_id: '917d669d-ea51-4031-b7ef-25b1850bbd52',
        },
      },
    },
  });

  const class2 = await prisma.class.upsert({
    where: { number: 111 },
    update: {},
    create: {
      id: '261133c7-c73c-4a7f-8199-548798dc0e97',
      number: 111,
      max_population: 15,
      ClassSubject: {
        create: {
          subject_id: 'c3114bc1-1bfa-4f44-ba17-f199a6dc635c',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
