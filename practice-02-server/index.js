const express = require('express');
const PORT = 5001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is runnint on the port ${PORT}`);
});
