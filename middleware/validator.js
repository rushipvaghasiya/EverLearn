const Validators = require('../validators/validation');

// eslint-disable-next-line consistent-return
module.exports = (validator) => (req, res, next) => {
  try {
    const validated = Validators[validator].validate(req);
    if (validated.error) {
      return next(validated.error);
    }
    next();
  } catch (err) {
    next(err);
  }
};
