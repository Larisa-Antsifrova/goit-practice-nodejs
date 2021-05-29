const { Router } = require('express');
const Book = require('../models/book.model');
const createBookMiddleware = require('../middlewares/createBook.middleware');
const validateId = require('../middlewares/validateId.middleware');

const router = Router();

router.post('/book', createBookMiddleware, async (req, res) => {
  const { body } = req;

  try {
    const result = await Book.create(body);
    return res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get('/book', async (req, res) => {
  try {
    const result = await Book.find();
    return res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get('/book/:id', validateId, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Book.findById(id);
    return res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put('/book/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await Book.findByIdAndUpdate(id, { ...body }, { new: true });
    return res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete('/book/:id', validateId, async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    return res.status(204).json();
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
