const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('joi');
const userRoute = require('./routes/users.route');
const moduleRoute = require('./routes/modules.route');
const lessonRoute = require('./routes/lessons.route');
const enrollmentRoute = require('./routes/enrollment.route');
const courseRoute = require('./routes/course.route');
const blockStudentRoute = require('./routes/blockStudent.route');
const errorConstant = require('./middleware/error');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/user', userRoute);
app.use('/courses', courseRoute);
app.use('/enrollments', enrollmentRoute);
app.use('/modules', moduleRoute);
app.use('/lessons', lessonRoute);
app.use('/blockStudents', blockStudentRoute);

app.use('/docs', express.static('docs/api'));

// Catch HTTP 404
app.use((req, res, next) => {
  next(new Error('NOT_FOUND'));
});

// error handing
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.details });
  }
  if (err.code === '23505' || err.code === '23503') {
    return res.status(400).json({ message: errorConstant.BAD_REQUEST.message });
  }
  const errorObj = errorConstant[err.message] || errorConstant.INTERNAL_SERVER_ERROR;
  console.info('errorObj :>> ', errorObj);
  return res.status(errorObj.status).json({
    message: errorObj.message
  });
});

module.exports = app;
