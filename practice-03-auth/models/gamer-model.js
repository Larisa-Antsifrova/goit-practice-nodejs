const { Schema, model } = require("mongoose");
const db = require("../db/mongo-db");

const gamerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [],
});

const Gamer = model("gamer", gamerSchema);

module.exports = Gamer;
