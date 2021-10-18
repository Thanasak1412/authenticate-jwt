const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
