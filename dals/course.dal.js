const pool = require('../config/db.config');
const updateQuery = require('../helpers/dal');

module.exports = {
  getCourses: async () => {
    const sqlQuery = `
      SELECT
        "courseId",
        "courseName",
        "courseDescription",
        "trainerId",
        "createdBy",
        "createdAt",
        "updatedBy",
        "updatedAt"
      FROM
        courses`;
    const courses = await pool.query(sqlQuery);
    return courses.rows;
  },
  getCourse: async (courseId) => {
    const sqlQuery = `
      SELECT
        "courseId",
        "courseName",
        "courseDescription",
        "trainerId",
        "createdBy",
        "createdAt",
        "updatedBy",
        "updatedAt"
      FROM
        courses
      WHERE
        "courseId" = $1`;
    const parameters = [courseId];
    const course = await pool.query(sqlQuery, parameters);
    if (!course.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return course.rows[0];
  },
  createCourse: async (newCourseObject, userId) => {
    const {
      courseName, courseDescription, trainerId
    } = newCourseObject;
    const parameters = [courseName, courseDescription, trainerId, userId];
    const sqlQuery = `
      INSERT
      INTO
        courses ("courseName",
        "courseDescription",
        "trainerId",
        "createdBy")
      VALUES ($1,$2,$3,$4)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
  updateCourse: async (courseId, userId, newCourseObject) => {
    // eslint-disable-next-line no-param-reassign
    newCourseObject.updatedBy = userId;
    const columns = Object.keys(newCourseObject);
    const parameters = [...Object.values(newCourseObject), courseId];
    const sqlQuery = `
      UPDATE
        courses
      SET
        ${updateQuery.updateQuery(columns)}
      WHERE
        "courseId" = $${columns.length + 1}`;
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  },
  deleteCourse: async (courseId) => {
    const sqlQuery = `
      DELETE
      FROM
        courses
      WHERE
        "courseId" = $1`;
    const parameters = [courseId];
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  }
};
