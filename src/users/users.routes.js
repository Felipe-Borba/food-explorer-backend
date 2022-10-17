const { Router } = require("express");

const usersRoutes = Router();
const usersController = require('./users.controller')

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;
