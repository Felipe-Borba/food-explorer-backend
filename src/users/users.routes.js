const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../middleware/validate");

const usersRoutes = Router();
const usersController = require("./users.controller");

usersRoutes.post(
  "/",
  check("name").notEmpty().withMessage("is required").trim(),
  check("password").notEmpty().withMessage("is required"),
  validate,
  usersController.create
);

usersRoutes.post(
  "/session",
  check("name").notEmpty().withMessage("is required").trim(),
  check("password").notEmpty().withMessage("is required"),
  validate,
  usersController.logIn
);

module.exports = usersRoutes;
