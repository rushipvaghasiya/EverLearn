const blockStudentService = require('../service/blockStudent.service');

module.exports = {
  getBlockStudent: async (req, res, next) => {
    try {
      const { blockStudentId } = req.params;
      const responseBody = await blockStudentService.getBlockStudent(blockStudentId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getBlockStudentCourse: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const responseBody = await blockStudentService.getBlockStudentCourse(courseId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createBlockStudent: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      await blockStudentService.createBlockStudent(userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  unblockStudent: async (req, res, next) => {
    try {
      const { blockStudentId } = req.params;
      await blockStudentService.unblockStudent(blockStudentId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
