require("dotenv").config();
const logger = require("./Log/winston");
const morgan = require("morgan");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests created from this IP, please try again after 15 minutes",
  statusCode: 429,
});
//! uncaught exceptions and handlers
process.on("uncaughtException", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});
//! end of uncaught exceptions and handlers

//= middleware
app.use(express.json());
app.use(helmet());
app.use(limiter);
if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

//+ register routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to a simple todo application!, enjoy 😀" });
});

//^ catch all routes
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Sorry, nothing here right now 😓",
  });
});

const Run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Database connection established, listening on ${PORT}`);
  });
};
Run();
