const { Schema, model } = require('mongoose');
const db = require('../db/connection');

const book = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genres: {
    type: String,
    required: false,
  },
});

const Book = model('books', book);

module.exports = Book;
