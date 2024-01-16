const lessonsDal = require('../dals/lessons.dal');

module.exports = {
  // To get details of a specific lesson
  getLesson: async (lessonId) => {
    const lesson = await lessonsDal.getLesson(lessonId);
    return lesson;
  },
  // To create a new lesson for a specific module
  createModuleLesson: async (moduleId, userId, reqBody) => lessonsDal
    .createModuleLesson(moduleId, userId, reqBody),
  // To delete a specific lesson
  deleteLesson: async (lessonId) => lessonsDal.deleteLesson(lessonId),
  // To get all lessons of a specific module
  getModuleLesson: async (moduleId) => {
    const lessons = await lessonsDal.getModuleLesson(moduleId);
    return { lessons };
  },
  // To update a specific lesson
  updateLesson: async (lessonId, userId, reqBody) => lessonsDal
    .updateLesson(lessonId, userId, reqBody)
};
