import { PrismaClient } from '@prisma/client';
import { genres } from './seeds/genres';
import { mediaTypes } from './seeds/media-types';
import { statuses } from './seeds/statuses';

const prisma = new PrismaClient();

async function main() {
  await prisma.genre.createMany({
    data: genres,
    skipDuplicates: true,
  });

  await prisma.mediaType.createMany({
    data: mediaTypes,
    skipDuplicates: true,
  });

  await prisma.status.createMany({
    data: statuses,
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
