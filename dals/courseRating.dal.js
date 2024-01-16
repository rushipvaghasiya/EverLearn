const pool = require('../config/db.config');

module.exports = {
  getCourseRatings: async (courseId) => {
    const sqlQuery = `
      SELECT
        "ratingId",
        rating,
        "ratedAt",
        "courseId",
        "studentId"
      FROM
        "courseRatings"
      WHERE
        "courseId" = $1`;
    const parameters = [courseId];
    const courseRatings = await pool.query(sqlQuery, parameters);
    return courseRatings.rows;
  },
  addCourseRating: async (courseId, userId, newCourseRatingObject) => {
    const {
      rating
    } = newCourseRatingObject;
    const parameters = [rating, courseId, userId];
    const sqlQuery = `
    INSERT
    INTO
      "courseRatings" (rating,
      "courseId",
      "studentId")
    VALUES ($1,$2,$3)`;
    const queryResult = await pool.query(sqlQuery, parameters);
    return queryResult;
  },
};
