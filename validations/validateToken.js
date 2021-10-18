require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(403).send("Access Denied.");
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decodedToken) => {
    if (err) return res.status(400).send("Invalid Token.");
    req.user = decodedToken;
    next();
  });
}

module.exports = verifyToken;
