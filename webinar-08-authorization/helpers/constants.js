const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  NONE: 'none',
};

const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MAY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const apiLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCodes.TOO_MAY_REQUESTS).json({
      status: 'error',
      code: HttpCodes.TOO_MAY_REQUESTS,
      message: 'Too many requrests made. Please try again later.',
    });
  },
};

module.exports = { Gender, HttpCodes, apiLimiter };
