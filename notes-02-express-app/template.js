const express = require("express");
const app = express();

//
app.set("views", "./"); //A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array.
app.set("view engine", "ejs"); //The default engine extension to use when omitted.

// Data sample
const users = [
  {
    name: "Yarik",
    age: 29,
    species: "Middle Front-ender",
  },
  {
    name: "Dima",
    age: "unknown",
    species: "Schuka catcher",
  },
];

// Route handler
app.get("/", (req, res) => {
  res.render("template", { users });
});

app.listen(3000, () => console.log("Template app listening on port 3000!"));
