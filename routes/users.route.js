const express = require('express');
const usersController = require('../controllers/users.controller');
const enrollmentController = require('../controllers/enrollment.controller');
const validate = require('../middleware/validator');
const permissions = require('../middleware/permission');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - user
 *     summary: To register new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user data
 *         schema:
 *           $ref: 'components/user/req.json#RegisterUser'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/register')
  .post(validate('registerSchema'), usersController.registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: To login user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user data
 *         schema:
 *           $ref: 'components/user/req.json#LoginAndTokenGeneration'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#LoginAndTokenGeneration'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/login')
  .post(validate('loginSchema'), usersController.loginAndTokenGeneration);

/**
 * @swagger
 * /user/enrollments:
 *   get:
 *     tags:
 *       - user
 *     summary: To get all courses login user enroll.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#LoginAndTokenGeneration'
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
router.route('/enrollments')
  .get(auth, permissions('Student'), enrollmentController.getEnrollmentsStudent);
module.exports = router;
