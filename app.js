const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const router = require("./src/routes/api");

const URL = "mongodb+srv://arfanhosenovi204_db_user:zY7mpKsTegzJgZ9S@cluster0.emsuaok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  autoIndex: true,
  useNewUrlParser: true
};

mongoose.connect(URL, options)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Failed:", err));

app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "client/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
app.get("/", (req, res) => {
  res.send("Server is Running Successfully!");
});

module.exports = app;
