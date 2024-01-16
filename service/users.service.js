const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDal = require('../dals/user.dal');
const { tokenSecretKey, tokenSaltRound } = require('../config/config');

const saltRounds = parseInt(tokenSaltRound, 10);
const TOKEN_KEY = tokenSecretKey;

module.exports = {
  // To create a new user account
  register: async (reqBody) => {
    const {
      userName, userEmail, userPassword, userRole
    } = reqBody;
    const passwordHash = await bcrypt.hash(userPassword, saltRounds);
    const values = [userName, userEmail, passwordHash, userRole];
    return userDal.registerUser(values);
  },
  // To authenticate user credentials and get the access token
  loginAndTokenGeneration: async (reqBody) => {
    const { userPassword, userEmail } = reqBody;
    const user = await userDal.loginUser(userEmail);
    const result = bcrypt.compare(userPassword, user.userPassword);
    if (result) {
      const PAYLOAD = {
        ...user,
      };
      const token = jwt.sign(PAYLOAD, TOKEN_KEY);
      return token;
    }
    throw new Error('NOT_FOUND');
  }
};
