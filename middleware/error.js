module.exports = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request is Found',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Authentication Credentials Invalid.',
  },
  FORBIDDEN: {
    status: 403,
    message: 'You not have permission to access.',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Data not found.',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'An internal server error occurred.',
  },
};
