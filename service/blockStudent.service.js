const blockStudentDal = require('../dals/blockStudent.dal');

module.exports = {
  // To get details of a specific blocked student
  getBlockStudent: async (blockStudentId) => {
    const student = await blockStudentDal.getBlockStudent(blockStudentId);
    return student;
  },
  // To get all blocked students of a specific course
  getBlockStudentCourse: async (courseId) => {
    const students = await blockStudentDal.getBlockStudentCourse(courseId);
    return { students };
  },
  // To block a student from accessing a specific course
  createBlockStudent: async (userId, requestBody) => blockStudentDal
    .createBlockStudent(userId, requestBody),
  // To unblock a specific student from a specific course
  unblockStudent: async (blockStudentId) => blockStudentDal.unblockStudent(blockStudentId)
};
