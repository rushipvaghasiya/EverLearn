const express = require('express');
const auth = require('../middleware/auth');
const courseController = require('../controllers/course.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     tags:
 *       - courses
 *     summary: To get list of courses.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/courses/res.json#GetCourses'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   post:
 *     tags:
 *       - courses
 *     summary: To create courses.
 *     parameters:
 *       - in: body
 *         name: courses
 *         description: courses data
 *         schema:
 *           $ref: 'components/courses/req.json#CreateCourse'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/')
  .get(auth, permissions(), courseController.getCourses)
  .post(auth, permissions('Trainer'), validate('createCourseSchema'), courseController.createCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     tags:
 *       - courses
 *     summary: To get courses.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/courses/res.json#GetCourse'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   put:
 *     tags:
 *       - courses
 *     summary: To update courses.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *       - in: body
 *         name: courses
 *         description: courses data
 *         schema:
 *           $ref: 'components/courses/req.json#UpdateCourse'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   delete:
 *     tags:
 *       - courses
 *     summary: To delete courses.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/:courseId')
  .get(auth, permissions(), validate('getCourseSchema'), courseController.getCourse)
  .put(auth, permissions('Trainer'), validate('updateCourseSchema'), courseController.updateCourse)
  .delete(auth, permissions('Trainer'), validate('deleteCourseSchema'), courseController.deleteCourse);

/**
 * @swagger
 * /courses/{courseId}/ratings:
 *   get:
 *     tags:
 *       - courses
 *     summary: To get list of courses ratings.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/courses/res.json#GetCourseRatings'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   post:
 *     tags:
 *       - courses
 *     summary: To create courses.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *       - in: body
 *         name: courses rating
 *         description: courses rating data
 *         schema:
 *           $ref: 'components/courses/req.json#AddCourseRating'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/:courseId/ratings')
  .get(auth, permissions(), validate('getCourseRatingsSchema'), courseController.getCourseRatings)
  .post(auth, permissions('Student'), validate('addCourseRatingSchema'), courseController.addCourseRating);

/**
 * @swagger
 * /courses/{courseId}/modules:
 *   get:
 *     tags:
 *       - courses
 *     summary: To get list modules of course.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/courses/res.json#GetCourseModules'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   post:
 *     tags:
 *       - courses
 *     summary: To create course module.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *       - in: body
 *         name: courses module
 *         description: courses module data
 *         schema:
 *           $ref: 'components/courses/req.json#CreateCourseModule'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/:courseId/modules')
  .get(auth, permissions(), validate('getCourseModulesSchema'), courseController.getCourseModules)
  .post(auth, permissions('Trainer'), validate('createCourseModuleSchema'), courseController.createCourseModule);

module.exports = router;
