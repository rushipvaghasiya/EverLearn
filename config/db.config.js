const { Pool } = require('pg');
const {
  dbUser, dbHost, dbName, dbPassword, dbPort
} = require('./config');

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort
});

module.exports = pool;
