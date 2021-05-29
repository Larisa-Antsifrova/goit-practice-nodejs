const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const usersPath = path.join(__dirname, "..", "db", "users.json");

router.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  console.log(users);
  res.json(users);
});

router.post("/users", (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const newUsers = [...users, user];

  fs.writeFileSync(usersPath, JSON.stringify(newUsers, null, 2));

  res.json({ message: "New user was created: ", user });
});

router.delete("/user/:name", (req, res) => {
  const name = req.params.name;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const newUsers = users.filter((user) => user.login !== name);

  fs.writeFileSync(usersPath, JSON.stringify(newUsers, null, 2));

  console.log(newUsers);

  res.json("The user was deleted!").status(204);
});

router.get("/hello", (req, res) => {
  res.json({ message: "hello friend" });
});

router.post("/user", (req, res) => {
  const body = req.body;
  console.log(body);

  res.json({ message: "User was created!", user: body });
});

module.exports = router;
