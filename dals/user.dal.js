const pool = require('../config/db.config');

module.exports = {
  registerUser: async (newUserObject) => {
    const sqlQuery = `
      INSERT
        INTO
        users ("userName", 
        "userEmail", 
        "userPassword", 
        "userRole")
      VALUES ($1,$2,$3,$4)`;
    const queryResult = await pool.query(sqlQuery, newUserObject);
    return queryResult;
  },
  loginUser: async (userEmail) => {
    const sqlQuery = `
      SELECT
        "userId",
        "userName",
        "userEmail",
        "userPassword",
        "userRole"
      FROM
        users
      WHERE
      "userEmail" = $1`;
    const parameters = [userEmail];
    const userDetails = await pool.query(sqlQuery, parameters);
    if (userDetails.rowCount === 0) {
      throw new Error('NOT_FOUND');
    }
    return userDetails.rows[0];
  }
};
