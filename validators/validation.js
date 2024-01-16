const Joi = require('joi');

module.exports = {
  registerSchema: Joi.object({
    body: Joi.object({
      userName: Joi.string().required(),
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required(),
      userRole: Joi.string().valid('Student', 'Trainer').required(),
    }).unknown(true)
  }).unknown(true),
  loginSchema: Joi.object({
    body: Joi.object({
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required(),
    }).unknown(true)
  }).unknown(true),
  getModuleSchema: Joi.object({
    params: Joi.object({
      moduleId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  updateModuleSchema: Joi.object({
    params: Joi.object({
      moduleId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      moduleName: Joi.string().optional(),
      courseId: Joi.number().optional(),
    }).unknown(true)
  }).unknown(true),
  deleteModuleSchema: Joi.object({
    params: Joi.object({
      moduleId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getModuleLessonSchema: Joi.object({
    params: Joi.object({
      moduleId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  createModuleLessonSchema: Joi.object({
    params: Joi.object({
      moduleId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      lessonName: Joi.string().required(),
      lessonLink: Joi.string().required(),
      lessonDescription: Joi.string().required(),
    }).unknown(true)
  }).unknown(true),
  getLessonSchema: Joi.object({
    params: Joi.object({
      lessonId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  updateLessonSchema: Joi.object({
    params: Joi.object({
      lessonId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      lessonLink: Joi.string().optional(),
      lessonName: Joi.string().optional(),
      moduleId: Joi.string().optional(),
      lessonDescription: Joi.string().optional(),
    }).unknown(true)
  }).unknown(true),
  deleteLessonSchema: Joi.object({
    params: Joi.object({
      lessonId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  createEnrollmentSchema: Joi.object({
    body: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true).unknown(true)
  }).unknown(true).unknown(true),
  getEnrollmentSchema: Joi.object({
    params: Joi.object({
      enrollId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  updateEnrollmentSchema: Joi.object({
    params: Joi.object({
      enrollId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      courseId: Joi.number().optional()
    }).unknown(true)
  }).unknown(true),
  deleteEnrollmentSchema: Joi.object({
    params: Joi.object({
      enrollId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getEnrollmentsCourseSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().optional()
    }).unknown(true)
  }).unknown(true),
  createCourseSchema: Joi.object({
    body: Joi.object({
      courseName: Joi.string().required(),
      courseDescription: Joi.string().required(),
      trainerId: Joi.number().required(),
    }).unknown(true)
  }).unknown(true),
  getCourseSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  updateCourseSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      courseName: Joi.string().optional(),
      courseDescription: Joi.string().optional(),
      trainerId: Joi.number().optional(),
    }).unknown(true)
  }).unknown(true),
  deleteCourseSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getCourseRatingsSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  addCourseRatingSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      rating: Joi.number().required(),
      studentId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getCourseModulesSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  createCourseModuleSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true),
    body: Joi.object({
      moduleName: Joi.string().required(),
    }).unknown(true)
  }).unknown(true),
  createBlockStudentSChema: Joi.object({
    body: Joi.object({
      studentId: Joi.number().required(),
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getBlockStudentSchema: Joi.object({
    params: Joi.object({
      blockStudentId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  unblockStudentSchema: Joi.object({
    params: Joi.object({
      blockStudentId: Joi.number().required()
    }).unknown(true)
  }).unknown(true),
  getBlockStudentCourseSchema: Joi.object({
    params: Joi.object({
      courseId: Joi.number().required()
    }).unknown(true)
  }).unknown(true)
};
