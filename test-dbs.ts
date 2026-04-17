import { Pool } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function testUrl(name: string, url: string) {
  const connectionString = url.replace('sslmode=require', '');
  console.log(`\nTesting ${name}...`);
  try {
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000
    });
    
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(`✅ ${name} OK! DB Time:`, res.rows[0].now);
    client.release();
    await pool.end();
  } catch(e:any) {
    console.log(`❌ ${name} error:`, e.message);
  }
}

async function run() {
  await testUrl('DATABASE_URL', process.env.DATABASE_URL || '');
  await testUrl('DIRECT_URL', process.env.DIRECT_URL || '');
}

run();
