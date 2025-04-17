require("dotenv").config();
const db = require("./db/init.mongodb");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { checkOverLoad } = require("./helpers/check.connect");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../src/configs/swagger");
const helmet = require("helmet");
const router = require("./routes");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); // compress respone reduce size
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init database
db.getinstance();
checkOverLoad();

// init swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// init routes
app.use("/", router);

// handling error
// Check 404 not found url
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
