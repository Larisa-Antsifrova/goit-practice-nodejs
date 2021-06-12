const express = require("express");
const boardgamesRouter = require("./routes/boardgames/boardgames-routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(boardgamesRouter);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
