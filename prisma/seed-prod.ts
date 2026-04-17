import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Utilisation de DIRECT_URL qui doit pointer sur schema=public
const connectionString = `postgresql://postgres.vrneshkvjysdglbbmtsd:7SFgw3%2Ft%25zSWgG%24@aws-1-eu-west-3.pooler.supabase.com:5432/postgres?schema=public`;

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const url = new URL(connectionString);
const schema = url.searchParams.get('schema') || 'public';
const adapter = new PrismaPg(pool, { schema });
const prisma = new PrismaClient({ adapter });

const PROD_ROOMS = Array.from({ length: 12 }, (_, i) => ({
  name: `Room PROD Publique #${i + 1}`,
  mode: i % 2 === 0 ? 'Classic' : 'Battle Royale',
  playerCount: Math.floor(Math.random() * 10) + 1,
}));

async function main() {
  console.log('🌱 Seeding PROD rooms...');
  await prisma.room.deleteMany();

  for (const room of PROD_ROOMS) {
    await prisma.room.create({ data: room });
  }

  const count = await prisma.room.count();
  console.log(`✅ ${count} rooms créées avec succès en PROD (schema public) !`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
