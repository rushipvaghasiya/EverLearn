const moduleService = require('../service/modules.service');
const lessonService = require('../service/lessons.service');

module.exports = {
  getModule: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      const responseBody = await moduleService.getModule(moduleId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  updateModule: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      const { moduleId } = req.params;
      await moduleService.updateModule(moduleId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteModule: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      await moduleService.deleteModule(moduleId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getModuleLesson: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      const responseBody = await lessonService.getModuleLesson(moduleId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createModuleLesson: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { moduleId } = req.params;
      const requestBody = req.body;
      await lessonService.createModuleLesson(moduleId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
