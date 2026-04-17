import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';

config({ path: '.env.local' });

const connectionString = `${process.env.DATABASE_URL}`.replace(
  /\?sslmode=require&?|&sslmode=require/g,
  (m) => (m.startsWith('?') && m.endsWith('&') ? '?' : '')
);

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const url = new URL(connectionString);
const schema = url.searchParams.get('schema') || 'public';
const adapter = new PrismaPg(pool, { schema });
const prisma = new PrismaClient({ adapter });

const DEV_ROOMS = [
  { name: 'Ligue des Testeurs', mode: 'Classic', playerCount: 3 },
  { name: 'Battle Alpha', mode: 'Battle Royale', playerCount: 7 },
  { name: 'Duel des Devs', mode: 'Duel Express', playerCount: 2 },
  { name: 'Room Staging #1', mode: 'Custom', playerCount: 5 },
  { name: 'Test Arena QA', mode: 'Classic', playerCount: 1 },
];

async function main() {
  console.log('🌱 Seeding rooms...');

  await prisma.room.deleteMany();

  for (const room of DEV_ROOMS) {
    await prisma.room.create({ data: room });
  }

  const count = await prisma.room.count();
  console.log(`✅ ${count} rooms créées avec succès !`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
