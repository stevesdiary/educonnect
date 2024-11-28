require('dotenv').config();
const { Pool } = require('pg');
const url = process.env.DB_URL;
// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   ssl: {
//     require: true,
//     rejectUnauthorized: true,
//   },
// };

// const db = new Pool(config);
// const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectDatabase() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connected to DB showing Current time:', result.rows[0].now);
  } catch (err) {
    console.error('Error executing query', err);
  }
}

connectDatabase();
// module.exports = { connectDatabase };

// async function queryDatabase() {
//   try {
//     const client = await db.connect();
//     try {
//       const res = await client.query("SELECT VERSION()");
//       console.log("Connected to:", res.rows[0].version.split(' ').slice(0, 2).join(' '));
//     } catch (err) {
//       console.error('Query error: ', err);
//     } finally {
//       client.release();
//     }
//   } catch (err) {
//     console.error('Connection error: ', err);
//   }
// }

// queryDatabase();

// process.on('SIGTERM', () => {
//   db.end(() => {
//     console.log('Pool has ended');
//     process.exit(0);
//   });
// });

// module.exports = { db };