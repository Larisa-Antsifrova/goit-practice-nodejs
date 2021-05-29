const express = require('express');
require('dotenv').config();
const router = require('./routes/router');

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is runnint on the port ${PORT}`);
});
