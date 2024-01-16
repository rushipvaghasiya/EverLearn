const moduleDal = require('../dals/modules.dal');

module.exports = {
  // To get details of a specific module
  getModule: async (moduleId) => {
    const module = await moduleDal.getModule(moduleId);
    return module;
  },
  // To create a new module for a specific course
  createCourseModule:
  async (courseId, userId, requestBody) => moduleDal
    .createCourseModule(courseId, userId, requestBody),
  // To delete a specific module
  deleteModule: async (moduleId) => moduleDal.deleteModule(moduleId),
  // To get all modules of a specific course
  getCourseModules: async (courseId) => {
    const modules = await moduleDal.getCourseModules(courseId);
    return { modules };
  },
  // To update a specific module
  updateModule: async (moduleId, userId, reqBody) => moduleDal
    .updateModule(moduleId, userId, reqBody)
};
