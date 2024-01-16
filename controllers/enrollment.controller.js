const enrollService = require('../service/enrollment.service');

module.exports = {
  getEnrollment: async (req, res, next) => {
    try {
      const { enrollId } = req.params;
      const responseBody = await enrollService.getEnrollment(enrollId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createEnrollment: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      await enrollService.createEnrollment(requestBody, userId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  updateEnrollment: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const requestBody = req.body;
      const { enrollId } = req.params;
      await enrollService.updateEnrollment(enrollId, userId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteEnrollment: async (req, res, next) => {
    try {
      const { enrollId } = req.params;
      await enrollService.deleteEnrollment(enrollId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getEnrollmentsStudent: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const responseBody = await enrollService.getEnrollmentsStudent(userId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getEnrollmentsCourse: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const responseBody = await enrollService.getEnrollmentsCourse(courseId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
};
