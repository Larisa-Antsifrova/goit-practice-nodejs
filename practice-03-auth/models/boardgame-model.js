const { Schema, model } = require("mongoose");
const db = require("../db/mongo-db");

const boardgameSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String, required: true },
});

const Boardgame = model("boardgame", boardgameSchema);

module.exports = Boardgame;
