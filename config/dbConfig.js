require('dotenv').config();
const { Pool } = require('pg');
const url = process.env.DB_URL;
const cloudinary = require('cloudinary');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  logging: console.log,
  // ssl: {
  //   require: true,
  //   rejectUnauthorized: false,
  // },
};

const db = new Pool(config)

async function connectDatabase() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Connected to DB showing Current time:', result.rows[0].now);
  } catch (err) {
    console.error('Error executing query', err);
  }
}
async function connectCloudinary() {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  } catch (error) {
    console.error('Error connecting to Cloudinary', error);
  }
}

connectCloudinary();
connectDatabase();
module.exports = { connectDatabase, connectCloudinary };
