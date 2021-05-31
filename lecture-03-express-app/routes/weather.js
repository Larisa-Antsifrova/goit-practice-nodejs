const express = require('express');
const router = express.Router();
const got = require('got');
const { query, validationResult } = require('express-validator');
require('dotenv').config();

router.get(
  '/',
  [query('lat').isNumeric(), query('lon').isNumeric()],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  async (req, res, next) => {
    const { lat, lon } = req.query;

    try {
      const response = await got('https://api.openweathermap.org/data/2.5/weather', {
        searchParams: {
          lat,
          lon,
          appid: process.env.API_KEY
        }
      });

      const {
        name,
        wind,
        weather: [weather],
        sys: { country }
      } = JSON.parse(response.body);

      res.json({
        country,
        name,
        weather,
        wind
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
