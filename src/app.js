const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require('./utils/AppError')

const usersRouter = require("./users/users.routes")

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      messageCode: error.messageCode,
      message: error.message,
    });
  }

  console.error(error);
  return response.status(500).json({
    status: "error",
    messageCode: 5000,
    message: "Internal server error",
  });
});

module.exports = app;