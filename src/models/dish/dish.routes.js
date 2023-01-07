const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../../middleware/validate");
const uploadConfig = require("../../configs/upload");
const multer = require("multer");

const dishRoutes = Router();
const dishController = require("./dish.controller");
const upload = multer(uploadConfig.MULTER);

dishRoutes.post(
  "/",
  check("nome").notEmpty().withMessage("é obrigatório").trim(),
  check("descricao").notEmpty().withMessage("é obrigatório").trim(),
  check("preco")
    .notEmpty()
    .withMessage("é obrigatório")
    .isNumeric()
    .withMessage("deve ser um numero"),
  check("ingredientes")
    .notEmpty()
    .withMessage("é obrigatório")
    .isArray()
    .withMessage("deve ser um array"),
  check("tipo")
    .notEmpty()
    .withMessage("é obrigatório")
    .trim()
    .isIn(["bebida", "sobremesa", "principal"])
    .withMessage("deve ser: bebida, sobremesa ou principal"),
  validate,
  dishController.create
);

dishRoutes.patch(
  "/:id",
  check("nome").notEmpty().withMessage("é obrigatório").trim(),
  check("descricao").notEmpty().withMessage("é obrigatório").trim(),
  check("preco")
    .notEmpty()
    .withMessage("é obrigatório")
    .isNumeric()
    .withMessage("deve ser um numero"),
  check("ingredientes")
    .notEmpty()
    .withMessage("é obrigatório")
    .isArray()
    .withMessage("deve ser um array"),
  check("tipo")
    .notEmpty()
    .withMessage("é obrigatório")
    .trim()
    .isIn(["bebida", "sobremesa", "principal"])
    .withMessage("deve ser: bebida, sobremesa ou principal"),
  validate,
  dishController.update
);

dishRoutes.patch(
  "/:id/imagem",
  upload.single("imagem"),
  dishController.updateDishImage
);

dishRoutes.get("/:id", dishController.loadById);

dishRoutes.delete("/:id", dishController.deleteById);

dishRoutes.get("/", dishController.list);

module.exports = dishRoutes;
