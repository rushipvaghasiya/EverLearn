const courseDal = require('../dals/course.dal');

module.exports = {
  // To get a list of all available courses
  getCourses: async () => {
    const courses = await courseDal.getCourses();
    return { courses };
  },
  // To get details of a specific course
  getCourse: async (courseId) => {
    const course = await courseDal.getCourse(courseId);
    return course;
  },
  // To create a new course
  createCourse: async (reqBody, userId) => courseDal.createCourse(reqBody, userId),
  // To update details of a specific course
  updateCourse: async (courseId, userId, reqBody) => courseDal.updateCourse(
    courseId,
    userId,
    reqBody
  ),
  // To delete a specific course
  deleteCourse: async (courseId) => courseDal.deleteCourse(courseId)
};
