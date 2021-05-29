const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

const db = mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = db;
