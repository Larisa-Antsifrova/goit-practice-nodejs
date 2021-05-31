const express = require("express");
const app = express();
const expressRouter = require("./express-router");

// Methods chaining
app
  .route("/blog")
  .get((req, res) => {
    res.send("Get a list of blog");
  })
  .post((req, res) => {
    res.send("Add a record to blog");
  })
  .put((req, res) => {
    res.send("Update blog");
  });

// Chekcing all method
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section ...");
  res.send("<p>Secret page. Tss!</p>");
  next();
});

// Using express.Router
app.use("/express-router", expressRouter);

// Launching server on specific port
app.listen(3000, () => {
  console.log("The app is listening on port 3000!");
});
