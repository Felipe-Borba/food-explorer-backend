const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const cookieParser = require("cookie-parser");

const usersRouter = require("./models/users/users.routes");
const dishRouter = require("./models/dish/dish.routes");
const ensureAuthenticated = require("./middleware/auth"); // TODO add authentication in all, check role is a business rule

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/dish", ensureAuthenticated, dishRouter);
app.use("/users", usersRouter);
app.use(
  "/files",
  ensureAuthenticated,
  express.static(uploadConfig.UPLOADS_FOLDER)
);

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
