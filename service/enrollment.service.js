const enrollmentDal = require('../dals/enrollment.dal');

module.exports = {
  // To get details of a specific enrollment
  getEnrollment: async (enrollId) => {
    const enrollment = await enrollmentDal.getEnrollment(enrollId);
    return enrollment;
  },
  // To create a new enrollment
  createEnrollment: async (reqBody, userId) => enrollmentDal.createEnrollment(reqBody, userId),
  // To update a specific enrollment
  updateEnrollment: async (enrollId, userId, reqBody) => enrollmentDal
    .updateEnrollment(enrollId, userId, reqBody),
  // To delete a specific enrollment
  deleteEnrollment: async (enrollId) => enrollmentDal.deleteEnrollment(enrollId),
  // To get all enrollments of a specific student
  getEnrollmentsStudent: async (userId) => {
    const enrollments = await enrollmentDal.getEnrollmentsStudent(userId);
    return { enrollments };
  },
  // To get all enrollments of a specific course
  getEnrollmentsCourse: async (courseId) => {
    const enrollments = await enrollmentDal.getEnrollmentsCourse(courseId);
    return { enrollments };
  },
};
