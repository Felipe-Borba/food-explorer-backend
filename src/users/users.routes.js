const { Router } = require("express");
const { check } = require("express-validator");

const usersRoutes = Router();
const usersController = require("./users.controller");

usersRoutes.post(
  "/",
  check("name").notEmpty().withMessage('is required').trim(),
  check("role").isIn(['admin', 'customer']).withMessage('should be: admin or customer'),
  check("password").notEmpty().withMessage('is required'),
  check("email").notEmpty().withMessage('is required').isEmail().withMessage('invalid email').normalizeEmail(),
  usersController.create
);

module.exports = usersRoutes;
