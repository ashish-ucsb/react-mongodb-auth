const mongoose = require("mongoose");
const dbName = "test";

mongoose.connect(`mongodb://localhost/${dbName}`);
const db = mongoose.connection.once("open", () =>
  console.log(`Connected to MongoDB: ${dbName} Database`)
);

module.exports = db;
