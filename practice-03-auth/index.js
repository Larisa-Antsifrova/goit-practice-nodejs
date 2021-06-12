const express = require("express");
const boardgamesRouter = require("./routes/boardgames/boardgames-routes");
const gamersRouter = require("./routes/gamers/gamers-routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(gamersRouter);
app.use(boardgamesRouter);

app.get("/", function (req, res) {
  return res.json({
    message:
      "Please checkout our /gamers/register endpoint to register or /gamers/login endpoint to login.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
