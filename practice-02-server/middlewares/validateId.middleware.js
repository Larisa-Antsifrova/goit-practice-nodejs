const Book = require('../models/book.model');

const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.json({ message: 'Required ID was not provided.' });
    }

    const result = await Book.findOne({ _id: id });

    if (!result) {
      return res.json({ message: `The book with ID${id} does not exist.` });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateId;
