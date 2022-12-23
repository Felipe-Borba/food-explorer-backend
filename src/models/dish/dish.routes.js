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
  check("preco").notEmpty().withMessage("é obrigatório").trim(),
  check("ingredientes").notEmpty().withMessage("é obrigatório").trim(),
  check("imagem").notEmpty().withMessage("é obrigatório").trim(),
  check("tipo")
    .notEmpty()
    .withMessage("é obrigatório")
    .trim()
    .isIn(["bebida", "sobremesa", "principal"])
    .withMessage("deve ser: bebida, sobremesa ou principal"),
  validate,
  upload.single("image"),
  dishController.create
);

dishRoutes.get("/:id", dishController.loadById);

dishRoutes.get("/", dishController.list);

module.exports = dishRoutes;
