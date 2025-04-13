require("dotenv").config();
const db = require("./db/init.mongodb");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { checkOverLoad } = require("./helpers/check.connect");
const helmet = require("helmet");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); // compress respone reduce size

// init database
db.getinstance();
checkOverLoad();
// init routes

// handling error

module.exports = app;
