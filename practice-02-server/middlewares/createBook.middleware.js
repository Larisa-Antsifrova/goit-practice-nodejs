const createBookMiddleware = (req, res, next) => {
  const { title, author, price } = req.body;

  try {
    if (!title || !author || !price) {
      return res.json({ message: 'Required data was not provided.' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = createBookMiddleware;
