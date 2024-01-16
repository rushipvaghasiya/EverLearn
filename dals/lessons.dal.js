const pool = require('../config/db.config');
const updateQuery = require('../helpers/dal');

module.exports = {
  getLesson: async (lessonId) => {
    const sqlQuery = `
    SELECT
      "lessonId",
      "lessonName",
      "lessonLink",
      "moduleId",
      "lessonDescription",
      "createdBy",
      "createdAt",
      "updatedBy",
      "updatedAt"
    FROM
      lessons
    WHERE
      "lessonId" = $1`;
    const parameters = [lessonId];
    const lesson = await pool.query(sqlQuery, parameters);
    if (!lesson.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return lesson.rows[0];
  },
  createModuleLesson: async (moduleId, userId, newLessonObject) => {
    const {
      lessonName, lessonLink, lessonDescription
    } = newLessonObject;
    const parameters = [lessonName, lessonLink, moduleId, lessonDescription, userId];
    const sqlQuery = `
    INSERT
    INTO
      lessons ("lessonName",
      "lessonLink",
      "moduleId",
      "lessonDescription",
      "createdBy")
    VALUES ($1,$2,$3,$4,$5)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteLesson: async (lessonId) => {
    const sqlQuery = `
      DELETE
      FROM
        lessons
      WHERE
        "lessonId" = $1`;
    const parameters = [lessonId];
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  },
  getModuleLesson: async (moduleId) => {
    const sqlQuery = `
    SELECT
      "lessonId",
      "lessonName",
      "lessonLink",
      "moduleId",
      "lessonDescription",
      "createdBy",
      "createdAt",
      "updatedBy",
      "updatedAt"
    FROM
      lessons
    WHERE
     "moduleId" = $1`;
    const parameters = [moduleId];
    const moduleLessons = await pool.query(sqlQuery, parameters);
    return moduleLessons.rows;
  },
  updateLesson: async (lessonId, userId, newLessonObject) => {
    // eslint-disable-next-line no-param-reassign
    newLessonObject.updatedBy = userId;
    const columns = Object.keys(newLessonObject);
    const parameters = [...Object.values(newLessonObject), lessonId];
    const sqlQuery = `
      UPDATE
        lessons
      SET
        ${updateQuery.updateQuery(columns)}
      WHERE
      "lessonId" = $${columns.length + 1}`;
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  }
};
