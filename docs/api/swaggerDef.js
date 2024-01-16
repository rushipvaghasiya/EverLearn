module.exports = {
  info: {
    title: 'EverLearn: e-learning platform',
    version: '1.0.1',
    description: 'API documentation',
  },
  host: 'localhost:8000',
  basePath: '/',
  apis: ['./../../routes/*.route.js'],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
