const router = require("express").Router();

const { getPosts } = require("../controllers/postController");
const verifyToken = require("../validations/validateToken");

router.get("/", verifyToken, getPosts);

module.exports = router;
