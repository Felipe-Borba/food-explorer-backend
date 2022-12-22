const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../../middleware/validate");

const usersRoutes = Router();
const usersController = require("./users.controller");

usersRoutes.post(
  "/",
  check("nome").notEmpty().withMessage("é obrigatório").trim(),
  check("email")
    .notEmpty()
    .withMessage("é obrigatório")
    .isEmail()
    .withMessage("inválido")
    .trim(),
  check("senha").notEmpty().withMessage("é obrigatório"),
  validate,
  usersController.create
);

usersRoutes.post(
  "/session",
  check("email").notEmpty().withMessage("é obrigatório").trim(),
  check("senha").notEmpty().withMessage("é obrigatório"),
  validate,
  usersController.logIn
);

module.exports = usersRoutes;
