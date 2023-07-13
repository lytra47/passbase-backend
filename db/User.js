const mongoose = require("mongoose");

const passDataSchema = new mongoose.Schema({
  saveUsername: String,
  saveWebsite: String,
  savePassword: String,
  saveNotes: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  data: [passDataSchema],
});

module.exports = mongoose.model("users", userSchema); //users should match with database collection
