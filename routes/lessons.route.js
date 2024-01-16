const express = require('express');
const auth = require('../middleware/auth');
const lessonController = require('../controllers/lessons.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /lessons/{lessonId}:
 *   get:
 *     tags:
 *       - lessons
 *     summary: To get list of all lessons.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: lessonId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/lessons/res.json#GetLesson'
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
 *       - lessons
 *     summary: To update lessons.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: lessonId
 *         type: integer
 *       - in: body
 *         name: lesson
 *         description: lessons data
 *         schema:
 *           $ref: 'components/lessons/req.json#UpdateLesson'
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
 *       - lessons
 *     summary: To delete lessons.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: lessonId
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
router.route('/:lessonId')
  .get(auth, permissions(), validate('getLessonSchema'), lessonController.getLesson)
  .put(auth, permissions('Trainer'), validate('updateLessonSchema'), lessonController.updateLesson)
  .delete(auth, permissions('Trainer'), validate('deleteLessonSchema'), lessonController.deleteLesson);

module.exports = router;
