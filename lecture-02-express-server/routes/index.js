const express = require("express");
const router = express.Router();
const data = require("../data/data.json");
const fs = require("fs/promises");
const path = require("path");

router.get("/", (req, res, next) => {
  res.render("index", { title: "ES-Home" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "ES-About", articles: data.articles });
});

router.get("/contacts", (req, res, next) => {
  res.render("contacts", { title: "ES-Contacts" });
});

router.post("/contacts", async (req, res, next) => {
  await fs.writeFile(path.join(__dirname, "..", "data", "message.json"), JSON.stringify(req.body, null, 2));
  res.redirect("/contacts");
});

module.exports = router;
