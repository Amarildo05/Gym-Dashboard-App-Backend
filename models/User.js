const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  membershipStartDate: String,
  nextPaymentDate: String,
  paymentStatus: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;