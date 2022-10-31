const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const cookieParser = require("cookie-parser");

const usersRouter = require("./models/users/users.routes");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

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
