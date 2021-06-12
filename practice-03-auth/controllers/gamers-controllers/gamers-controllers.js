const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Gamer = require("../../models/gamer-model");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const registerGamer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isCandidateExist = await Gamer.findOne({ email });
    if (isCandidateExist) {
      return res
        .status(401)
        .json({ message: "The gamer with this email already exists." });
    }

    // const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password.toString(), 10);

    await Gamer.create({ email, password: hashedPassword });

    return res.status(201).json({ message: "Welcome!" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const loginGamer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Gamer.findOne({ email });

    if (!candidate) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordCorret = bcrypt.compareSync(password, candidate.password);

    if (!isPasswordCorret) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = { id: candidate._id, email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).json({ name: candidate.name, token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  registerGamer,
  loginGamer,
};
