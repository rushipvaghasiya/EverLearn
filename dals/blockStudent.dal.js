const pool = require('../config/db.config');

module.exports = {
  getBlockStudent: async (blockStudentId) => {
    const sqlQuery = `
      SELECT
        "blockstudentId",
        "blockedBy",
        "studentId",
        "courseId",
        "blockedAt",
        "userName",
        "userEmail"
      FROM
        "blockStudents"
      JOIN users ON
        users."userId" = "blockStudents"."studentId"
      WHERE
        "studentId" = $1`;
    const parameters = [blockStudentId];
    const blockedStudent = await pool.query(sqlQuery, parameters);
    if (!blockedStudent.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return blockedStudent.rows[0];
  },
  getBlockStudentCourse: async (courseId) => {
    const sqlQuery = `
      SELECT
        "blockstudentId",
        "blockedBy",
        "studentId",
        "courseId",
        "blockedAt",
        "userName",
        "userEmail"
      FROM
        "blockStudents"
      JOIN users ON
      users."userId" = "blockStudents"."studentId"
      WHERE
        "courseId" = $1`;
    const parameters = [courseId];
    const blockedStudents = await pool.query(sqlQuery, parameters);
    return blockedStudents.rows;
  },
  createBlockStudent: async (userId, newBlockStudentObject) => {
    const {
      studentId, courseId
    } = newBlockStudentObject;
    const parameters = [userId, studentId, courseId];
    const sqlQuery = `
      INSERT
      INTO
        "blockStudents" ("blockedBy",
        "studentId",
        "courseId")
      VALUES ($1,$2,$3)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
  unblockStudent: async (blockStudentId) => {
    const sqlQuery = `
      DELETE
      FROM
        "blockStudents"
      WHERE
        "blockstudentId" = $1`;
    const parameters = [blockStudentId];
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  }
};
