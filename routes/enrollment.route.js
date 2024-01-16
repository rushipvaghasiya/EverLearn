const express = require('express');
const auth = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollment.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /enrollments:
 *   post:
 *     tags:
 *       - enrollments
 *     summary: To create enrollment.
 *     parameters:
 *       - in: body
 *         name: enrollment
 *         description: enrollments data
 *         schema:
 *           $ref: 'components/enrollment/req.json#CreateEnrollment'
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
  .post(auth, permissions('Student'), validate('createEnrollmentSchema'), enrollmentController.createEnrollment);

/**
 * @swagger
 * /enrollments/{enrollId}:
 *   get:
 *     tags:
 *       - enrollments
 *     summary: To get specific enrollment.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: enrollId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/enrollment/res.json#GetEnrollment'
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
 *       - enrollments
 *     summary: To update enrollment.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: enrollId
 *         type: integer
 *       - in: body
 *         name: enrollment
 *         description: enrollments data
 *         schema:
 *           $ref: 'components/enrollment/req.json#UpdateEnrollment'
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
 *       - enrollments
 *     summary: To delete enrollment.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: enrollId
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
router.route('/:enrollId')
  .get(auth, permissions(), validate('getEnrollmentSchema'), enrollmentController.getEnrollment)
  .put(auth, permissions('Student'), validate('updateEnrollmentSchema'), enrollmentController.updateEnrollment)
  .delete(auth, permissions('Student'), validate('deleteEnrollmentSchema'), enrollmentController.deleteEnrollment);

/**
 * @swagger
 * /enrollments/courses/{courseId}:
 *   get:
 *     tags:
 *       - enrollments
 *     summary: To get specific course enrollment.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: courseId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/enrollment/res.json#GetEnrollmentsCourse'
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
router.route('/courses/:courseId')
  .get(auth, permissions('Trainer'), validate('getEnrollmentsCourseSchema'), enrollmentController.getEnrollmentsCourse);

module.exports = router;
