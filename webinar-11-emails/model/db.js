const mongoose = require("mongoose");
require("dotenv").config();
let uriDb = null;

if (process.env.NODE_ENV === "test") {
  uriDb = process.env.URI_DB_TEST;
} else {
  uriDb = process.env.URI_DB;
}

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

if (process.env.NODE_ENV !== "test") {
  mongoose.connection.on("connected", () => {
    console.log(`Connection open.`);
  });

  mongoose.connection.on("error", error => {
    console.log(`Error Mongoose connection: ${error.message}.`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`Mongoose connection terminated.`);
  });
}

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to DB terminated.");
    process.exit(1);
  });
});

module.exports = db;
