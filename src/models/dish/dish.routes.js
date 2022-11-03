const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../../middleware/validate");
const uploadConfig = require("../../configs/upload");
const multer = require("multer");

const dishRoutes = Router();
const dishController = require("./dish.controller");
const upload = multer(uploadConfig.MULTER);
const ensureAuthenticated = require("../../middleware/auth"); // TODO add authentication

dishRoutes.post(
  "/",
  check("name").notEmpty().withMessage("is required").trim(),
  check("description").notEmpty().withMessage("is required").trim(),
  check("price").notEmpty().withMessage("is required").trim(),
  check("ingredients").notEmpty().withMessage("is required").trim(),
  check("image").notEmpty().withMessage("is required").trim(),
  validate,
  upload.single("image"),
  dishController.create
);

dishRoutes.get("/:id", dishController.loadById);

dishRoutes.put(
  "/",

  check("id").notEmpty().withMessage("is required").trim(),
  check("name").notEmpty().withMessage("is required").trim(),
  check("description").notEmpty().withMessage("is required").trim(),
  check("price").notEmpty().withMessage("is required").trim(),
  check("ingredients").notEmpty().withMessage("is required").trim(),
  check("image").notEmpty().withMessage("is required").trim(),
  validate,
  upload.single("image"),
  dishController.updateById
);

dishRoutes.delete("/:id", dishController.deleteById);

dishRoutes.get("/", dishController.list);

module.exports = dishRoutes;
