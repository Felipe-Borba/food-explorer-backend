const { Router } = require("express");
const { check } = require("express-validator");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middleware/auth");
const validate = require("../middleware/validate");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);
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

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  // check("userId").notEmpty().withMessage("is required"),
  // check("filename").notEmpty().withMessage("is required"),
  usersController.updateAvatar
);

module.exports = usersRoutes;
