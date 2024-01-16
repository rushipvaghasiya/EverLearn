const express = require('express');
const auth = require('../middleware/auth');
const blockStudentController = require('../controllers/blockStudent.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /blockStudents:
 *   post:
 *     tags:
 *       - blockStudent
 *     summary: To block a student from accessing a specific course.
 *     parameters:
 *       - in: body
 *         name: blockStudents
 *         description: block Students data
 *         schema:
 *           $ref: 'components/blockStudents/req.json#CreateBlockStudent'
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
  .post(auth, permissions('Trainer'), validate('createBlockStudentSChema'), blockStudentController.createBlockStudent);

/**
 * @swagger
  * /blockStudents/{blockStudentId}:
 *   get:
 *     tags:
 *       - blockStudent
 *     summary: To get details of a specific blocked student.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/blockStudents/res.json#GetBlockStudent'
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
 *       - blockStudent
 *     summary: To unblock a specific student from a specific course.
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
router.route('/:blockStudentId')
  .get(auth, permissions(), validate('getBlockStudentSchema'), blockStudentController.getBlockStudent)
  .delete(auth, permissions('Trainer'), validate('unblockStudentSchema'), blockStudentController.unblockStudent);

/**
 * @swagger
 * /blockStudents/courses/{courseId}:
 *   get:
 *     tags:
 *       - blockStudent
 *     summary: To get all blocked students of a specific course
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/blockStudents/res.json#GetBlockStudentCourse'
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
  .get(auth, permissions('Trainer'), validate('getBlockStudentCourseSchema'), blockStudentController.getBlockStudentCourse);

module.exports = router;
