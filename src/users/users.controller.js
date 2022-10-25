const usersService = require("./users.service");
const utils = require("../utils/utils");

async function create(request, response, next) {
  try {
    utils.checkRequestError(request);

    const user = request.body;
    return response.status(201).send(await usersService.create(user));
  } catch (error) {
    next(error);
  }
}

async function logIn(request, response, next) {
  try {
    utils.checkRequestError(request);

    const user = request.body;
    return response.status(200).send(await usersService.logIn(user));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  logIn
};
