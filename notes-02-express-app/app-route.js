const express = require("express");
const path = require("path");
const app = express();

// Middleware immitation test
app.use((req, res, next) => {
  console.log("Middleware!");
  next();
});

// Adding JSON parser
app.use(express.json());

// Returning Static files first
app.use(express.static(path.join(__dirname + "/public")));

// Adding URL parser
app.use(express.urlencoded({ extended: false }));

// Handling the form
app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  res.send(`<h1>Login</h1> <p>Email: ${email}</p> <p>Pass: ${password}</p>`);
});

// Working with URL parameters
app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact ID</h1> Параметр: ${req.params.id}`);
});

// Working with querty parameters
app.get("/contact", (req, res) => {
  const text = JSON.stringify(req.query);
  res.send(`<h1>Contact Query</h1> <p>Параметр:</p> ${text}`);
});

// Launching server on specific port
app.listen(3000, () => {
  console.log("The app is listening on port 3000!");
});
