require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.LDB_USER,
    "password": process.env.LDB_PASSWORD,
    "database": process.env.LDB_NAME,
    "host": process.env.LDB_HOST,
    "dialect": "postgres",
    dialectOptions: {
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      //   // ca: process.env.CERTIFICATE
      // },
      "connectTimeout": 30000
    },
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    dialectOptions: {
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
      "connectTimeout": 30000
    },
  }
};
