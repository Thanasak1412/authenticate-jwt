require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000 || process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);

// Connect DB
mongoose
  .connect(process.env.CONNECT_DB)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(`{${err}} did connect`));
