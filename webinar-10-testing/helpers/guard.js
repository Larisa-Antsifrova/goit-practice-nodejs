const passport = require('passport');
const { HttpCodes } = require('./constants');
require('../config/passport');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const headerAuth = req.get('Authorization');
    let token = null;

    if (headerAuth) {
      token = headerAuth.split(' ')[1];
    }
    if (error || !user || token !== user?.token) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCodes.UNAUTHORIZED,
        message: 'Invalid credentials.',
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
