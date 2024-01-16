const lessonService = require('../service/lessons.service');

module.exports = {
  getLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;
      const responseBody = await lessonService.getLesson(lessonId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  updateLesson: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      const { lessonId } = req.params;
      await lessonService.updateLesson(lessonId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;
      await lessonService.deleteLesson(lessonId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
