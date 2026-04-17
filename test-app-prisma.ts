import { prisma } from './src/lib/prisma.ts';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function main() {
  try {
    const users = await prisma.user.findMany({ take: 1 });
    console.log('App Prisma connection OK! Users found:', users.length);
    
    const matches = await prisma.match.findMany({ take: 1 });
    console.log('App Prisma connection OK! Matches found:', matches.length);
  } catch (e: any) {
    console.error('App Prisma connection error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
