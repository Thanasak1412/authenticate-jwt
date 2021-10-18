const Joi = require("@hapi/joi");

function verifySignup(req) {
  const schema = {
    username: Joi.string().min(6).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(req, schema);
}

function verifyLogin(req) {
  const schema = {
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = { verifySignup, verifyLogin };
