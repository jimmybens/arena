import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Prisma connection OK! Users found:', users.length);
    
    const matches = await prisma.match.findMany({ take: 1 });
    console.log('Prisma connection OK! Matches found:', matches.length);
  } catch (e: any) {
    console.error('Prisma connection error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
