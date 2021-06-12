const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const jwtVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("JWT token is not provided.");
    }

    jwt.verify(token, JWT_SECRET_KEY);

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = jwtVerify;
