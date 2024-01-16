const courseService = require('../service/course.service');
const courseRatingService = require('../service/courseRating.service');
const modulesService = require('../service/modules.service');

module.exports = {
  getCourses: async (req, res, next) => {
    try {
      const responseBody = await courseService.getCourses();
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getCourse: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const responseBody = await courseService.getCourse(courseId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createCourse: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      await courseService.createCourse(requestBody, userId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  updateCourse: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      const { courseId } = req.params;
      await courseService.updateCourse(courseId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      await courseService.deleteCourse(courseId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getCourseRatings: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const responseBody = await courseRatingService.getCourseRatings(courseId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  addCourseRating: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { courseId } = req.params;
      const requestBody = req.body;
      await courseRatingService.addCourseRating(courseId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getCourseModules: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const responseBody = await modulesService.getCourseModules(courseId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createCourseModule: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      const { courseId } = req.params;
      await modulesService.createCourseModule(courseId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
