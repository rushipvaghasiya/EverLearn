const userService = require('../service/users.service');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await userService.register(requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  loginAndTokenGeneration: async (req, res, next) => {
    try {
      const requestBody = req.body;
      const token = await userService.loginAndTokenGeneration(requestBody);
      res.status(200).json({ message: 'Token is generated, Login Successful.', token });
    } catch (error) {
      next(error);
    }
  }
};
