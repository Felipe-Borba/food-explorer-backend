const { Router } = require("express");
const { check } = require("express-validator");

const usersRoutes = Router();
const usersController = require("./users.controller");

usersRoutes.post(
  "/",
  check("name").notEmpty(),
  check("password").notEmpty(),
  check("email").notEmpty().normalizeEmail(),
  usersController.create
);

module.exports = usersRoutes;
