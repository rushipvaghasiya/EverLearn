const dotenv = require('dotenv-safe');

dotenv.config();

const serverPort = process.env.SERVER_PORT;
const dbUser = process.env.DATABASE_USER;
const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbPort = process.env.DATABASE_PORT;
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
const tokenSaltRound = process.env.TOKEN_SALT_ROUND;

module.exports = {
  serverPort, dbUser, dbHost, dbName, dbPassword, dbPort, tokenSecretKey, tokenSaltRound
};
