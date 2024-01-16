const express = require('express');
const auth = require('../middleware/auth');
const modulesController = require('../controllers/modules.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /modules/{moduleId}:
 *   get:
 *     tags:
 *       - modules
 *     summary: To get list of all modules.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: moduleId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/module/res.json#GetModule'
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
 *       - modules
 *     summary: To update modules.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: moduleId
 *         type: integer
 *       - in: body
 *         name: module
 *         description: module data
 *         schema:
 *           $ref: 'components/module/req.json#UpdateModule'
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
 *       - modules
 *     summary: To delete specific module.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: moduleId
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
router.route('/:moduleId')
  .get(auth, permissions(), validate('getModuleSchema'), modulesController.getModule)
  .put(auth, permissions('Trainer'), validate('updateModuleSchema'), modulesController.updateModule)
  .delete(auth, permissions('Trainer'), validate('deleteModuleSchema'), modulesController.deleteModule);

/**
 * @swagger
 * /modules/{moduleId}/lessons:
 *   get:
 *     tags:
 *       - modules
 *     summary: To get list of all modules.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: moduleId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/module/res.json#GetModuleLesson'
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
 *       - modules
 *     summary: To update modules.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: moduleId
 *         type: integer
 *       - in: body
 *         name: module
 *         description: module data
 *         schema:
 *           $ref: 'components/module/req.json#CreateModuleLesson'
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
router.route('/:moduleId/lessons')
  .get(auth, permissions(), validate('getModuleLessonSchema'), modulesController.getModuleLesson)
  .post(auth, permissions('Trainer'), validate('createModuleLessonSchema'), modulesController.createModuleLesson);

module.exports = router;
