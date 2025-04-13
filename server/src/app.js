const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); // compress respone reduce size

// init database

// init routes

// handling error

module.exports = app;
