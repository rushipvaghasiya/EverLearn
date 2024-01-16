const courseRatingDal = require('../dals/courseRating.dal');

module.exports = {
  // To get all ratings of a specific course
  getCourseRatings: async (courseId) => {
    const ratings = await courseRatingDal.getCourseRatings(courseId);
    return { ratings };
  },
  // To add a new rating for a specific course
  addCourseRating:
  async (courseId, userId, requestBody) => courseRatingDal
    .addCourseRating(courseId, userId, requestBody)
};
