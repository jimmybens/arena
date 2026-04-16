import { Pool } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function test() {
  const connectionString = `${process.env.DATABASE_URL}`.replace('sslmode=require', '');
  
  try {
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false } 
    });
    await pool.connect();
    console.log("Pool OK!");
  } catch(e:any) {
    console.log("Pool error:", e.message);
  }
}

test();
