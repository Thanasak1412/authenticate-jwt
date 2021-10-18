require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { verifySignup, verifyLogin } = require("../validations/auth");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { error } = verifyLogin({ username, password });

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      const token = jwt.sign(user.username, process.env.SECRET_ACCESS_TOKEN);
      res.header("auth-token", token).json({ token, user });
    }
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { error } = verifySignup({ username, email, password });

    if (error) return res.json({ message: error.details[0].message });

    const salt = await bcrypt.genSalt();
    const trimUsername = username.trim();
    const trimEmail = email.trim();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: trimUsername,
      email: trimEmail,
      password: hashPassword,
    });
    const token = jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN);

    res.header("auth-token", token).json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { login, signup };
