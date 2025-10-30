const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Routes
const router = require("./src/routes/api");

// MongoDB Connection
const URL = "mongodb://localhost:27017/ecommerceMERN";

mongoose.connect(URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

// Security Middleware
app.use(helmet());
app.use(hpp());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Sanitize user input
app.use((req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (key.startsWith("$") || key.includes(".")) delete obj[key];
      else if (typeof obj[key] === "object") sanitize(obj[key]);
    }
  };
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
});

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10000,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// API routes
app.use("/api", router);

// Serve frontend in production
app.use(express.static(path.join(__dirname, "client/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// Default test route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

module.exports = app;