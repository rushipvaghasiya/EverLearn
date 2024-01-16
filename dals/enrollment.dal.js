const pool = require('../config/db.config');
const updateQuery = require('../helpers/dal');

module.exports = {
  getEnrollment: async (enrollId) => {
    const sqlQuery = `
      SELECT
        "enrollId",
        "enrollAt",
        "studentId",
        "courseId"
      FROM
        enrollments
      WHERE
        "enrollId" = $1`;
    const parameters = [enrollId];
    const enrollment = await pool.query(sqlQuery, parameters);
    if (!enrollment.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return enrollment.rows[0];
  },
  createEnrollment: async (newEnrollmentObject, userId) => {
    const {
      courseId
    } = newEnrollmentObject;
    const parameters = [userId, courseId];
    const sqlQuery = `
      INSERT
      INTO
        enrollments (
        "studentId",
        "courseId")
      VALUES ($1,$2)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteEnrollment: async (enrollId) => {
    const sqlQuery = `
      DELETE
      FROM
        enrollments
      WHERE
        "enrollId" = $1`;
    const parameters = [enrollId];
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  },
  getEnrollmentsStudent: async (userId) => {
    const sqlQuery = `
      SELECT
        "enrollId",
        "enrollAt",
        "studentId",
        "courseId"
      FROM
        enrollments
      WHERE
        "studentId" = $1`;
    const parameters = [userId];
    const enrollStudents = await pool.query(sqlQuery, parameters);
    return enrollStudents.rows;
  },
  getEnrollmentsCourse: async (courseId) => {
    const sqlQuery = `
      SELECT
        "enrollId",
        "enrollAt",
        "studentId",
        "courseId"
      FROM
        enrollments
      WHERE
        "courseId" = $1`;
    const parameters = [courseId];
    const enrollCourses = await pool.query(sqlQuery, parameters);
    return enrollCourses.rows;
  },
  updateEnrollment: async (enrollId, userId, newEnrollmentObject) => {
    const columns = Object.keys(newEnrollmentObject);
    const parameters = [...Object.values(newEnrollmentObject), enrollId];
    const sqlQuery = `
      UPDATE
        enrollments
      SET
        ${updateQuery.updateQuery(columns)}
      WHERE
        "enrollId" = $${columns.length + 1}`;
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  }
};
