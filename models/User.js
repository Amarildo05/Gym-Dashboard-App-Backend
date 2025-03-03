const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  is_validated: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;