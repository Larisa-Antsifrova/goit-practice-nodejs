const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
require("dotenv").config();
const Users = require("../repositories/users");
const { HttpCodes } = require("../helpers/constants");
// const path = require('path');
// const UploadAvatarService = require('../services/local-upload');
const UploadAvatarService = require("../services/cloud-upload");
const EmailService = require("../services/email-service");
const {
  CreateSenderSendgrid,
  CreateSenderNodemailer,
} = require("../services/email-sender");

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        status: "error",
        code: HttpCodes.CONFLICT,
        message: "This email is already in use.",
      });
    }

    const { id, name, email, avatar, gender, verifyToken } =
      await Users.createUser(req.body);

    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderSendgrid(),
      );

      await emailService.sendVerifictionEmail(verifyToken, email, name);
    } catch (error) {
      console.log(error.message);
    }

    return res.status(HttpCodes.CREATED).json({
      status: "success",
      code: HttpCodes.CREATED,
      message: "You registered successfully.",
      data: {
        id,
        name,
        email,
        avatar,
        gender,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword || !user.isVerified) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: "error",
        code: HttpCodes.UNAUTHORIZED,
        message: "Invalid credentials.",
      });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);

    return res.json({
      status: "success",
      code: HttpCodes.OK,
      message: "You have logged in.",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Users.updateToken(id, null);
    return res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {}
};

// Local images upload

// const avatars = async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const uploads = new UploadAvatarService(process.env.AVATAR_DIR);
//     const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });

//     try {
//       await fs.unlink(path.join(process.env.AVATAR_DIR, req.user.avatar));
//     } catch (error) {
//       console.log(error.message);
//     }

//     await Users.updateAvatar(id, avatarUrl);
//     res.json({ status: 'success', code: HttpCodes.OK, message: 'Avatar uploaded!', data: { avatarUrl } });
//   } catch (error) {
//     next(error);
//   }
// };

// Cloudinary images upload

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService();
    const { avatarUrl, idCloudAvatar } = await uploads.saveAvatar(
      req.file.path,
      req.user.idCloudAvatar,
    );

    fs.unlink(req.file.path);

    await Users.updateAvatar(id, avatarUrl, idCloudAvatar);
    res.json({
      status: "success",
      code: HttpCodes.OK,
      message: "Avatar uploaded!",
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.token);

    console.log("user", user);
    console.log("token", req.params.token);

    if (user) {
      await Users.updateVerificationToken(user.id, true, null);

      return res.json({
        status: "success",
        code: HttpCodes.OK,
        message: "Your account is verified!",
      });
    }

    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "error",
      code: HttpCodes.BAD_REQUEST,
      message: "Verification link is no longer valid.",
    });
  } catch (error) {
    next(error);
  }
};

const repeatVerification = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  avatars,
  verify,
  repeatVerification,
};
