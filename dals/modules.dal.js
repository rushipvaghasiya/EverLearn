const pool = require('../config/db.config');
const updateQuery = require('../helpers/dal');

module.exports = {
  getModule: async (moduleId) => {
    const sqlQuery = `
    SELECT
      "moduleId",
      "moduleName",
      "courseId",
      "createdBy",
      "createdAt",
      "updatedBy",
      "updatedAt"
    FROM
      modules
    WHERE
      "moduleId" = $1`;
    const parameters = [moduleId];
    const module = await pool.query(sqlQuery, parameters);
    if (!module.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return module.rows[0];
  },
  createCourseModule: async (courseId, userId, newCourseObject) => {
    const {
      moduleName
    } = newCourseObject;
    const parameters = [moduleName, courseId, userId];
    const sqlQuery = `
    INSERT
    INTO
      modules ("moduleName",
      "courseId",
      "createdBy")
    VALUES ($1,$2,$3)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteModule: async (moduleId) => {
    const sqlQuery = `
      DELETE
      FROM
        modules
      WHERE
        "moduleId" = $1`;
    const parameters = [moduleId];
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  },
  getCourseModules: async (courseId) => {
    const sqlQuery = `
      SELECT
        "moduleId",
        "moduleName",
        "courseId",
        "createdBy",
        "createdAt",
        "updatedBy",
        "updatedAt"
      FROM
        modules
      WHERE
      "courseId" = $1`;
    const parameters = [courseId];
    const courseModules = await pool.query(sqlQuery, parameters);
    return courseModules.rows;
  },
  updateModule: async (moduleId, userId, newModuleObject) => {
    // eslint-disable-next-line no-param-reassign
    newModuleObject.updatedBy = userId;
    const columns = Object.keys(newModuleObject);
    const parameters = [...Object.values(newModuleObject), moduleId];
    const sqlQuery = `
      UPDATE
        modules
      SET
        ${updateQuery.updateQuery(columns)}
      WHERE
        "moduleId" = $${columns.length + 1}`;
    const queryResult = await pool.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult;
  }
};
