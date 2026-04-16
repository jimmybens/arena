import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`.replace(/\?sslmode=require&?|&sslmode=require/g, function(match) { return match.startsWith('?') && match.endsWith('&') ? '?' : ''; });
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false } 
});
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma_v3: PrismaClient };

export const prisma =
  globalForPrisma.prisma_v3 ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_v3 = prisma;
