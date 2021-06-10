const Users = require('../repositories/users');
const { HttpCodes } = require('../helpers/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        status: 'error',
        code: HttpCodes.CONFLICT,
        message: 'This email is already in use.'
      });
    }

    const { id, name, email, avatar, gender } = await Users.createUser(req.body);
    return res.status(HttpCodes.CREATED).json({
      status: 'success',
      code: HttpCodes.CREATED,
      message: 'You registered successfully.',
      data: {
        id,
        name,
        email,
        avatar,
        gender
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCodes.UNAUTHORIZED,
        message: 'Invalid credentials.'
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(id, token);

    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'You have logged in.',
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Users.updateToken(id, null);
    res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {}
};

const avatars = async (req, res, next) => {
  res.json({ message: 'Avatar uploaded!' });
};

module.exports = {
  register,
  login,
  logout,
  avatars
};
