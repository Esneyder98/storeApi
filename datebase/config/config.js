const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
  development: {
    username: env.USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT, // Agrega esta línea
    port: env.DATABASE_PORT,
  },
  test: {
    username: env.USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT, // Agrega esta línea
    port: env.DATABASE_PORT,
  },
  production: {
    username: env.USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT, // Agrega esta línea
    port: env.DATABASE_PORT,
  },
};
