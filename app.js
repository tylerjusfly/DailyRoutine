const env = require("dotenv");
env.config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Creating Routes

const indexRoute = require("./api/routes/index");
const authRoute = require("./api/routes/auth");
const usersRoute = require("./api/routes/user");
const shopRoute = require("./api/routes/shop");
const paymentRoute = require("./api/routes/payments");


// DataBase
const url = "mongodb://localhost:27017/anyshop";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Mongo Database connected:", url);
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting Headers for Cors ..
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes handling requests
app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/orders", ordersRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/pay", paymentRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
