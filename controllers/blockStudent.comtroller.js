const blockStudentService = require('../service/blockStudent.service');

module.exports = {
  getBlockStudent: async (req, res, next) => {
    try {
      const { blockStudentId } = req.params;
      const data = await blockStudentService.getBlockStudent(blockStudentId);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },
  getBlockStudentCourse: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const data = await blockStudentService.getBlockStudentCourse(courseId);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },
  createBlockStudent: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await blockStudentService.createBlockStudent(requestBody);
      res.status(200).json({ message: 'Record Inserted.' });
    } catch (error) {
      next(error);
    }
  },
  unblockStudent: async (req, res, next) => {
    try {
      const { blockStudentId } = req.params;
      await blockStudentService.unblockStudent(blockStudentId);
      res.status(200).json({ message: 'Deleted Successful.' });
    } catch (error) {
      next(error);
    }
  }
};
