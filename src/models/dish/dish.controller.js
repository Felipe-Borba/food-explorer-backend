const dishService = require("./dish.service");

async function create(request, response, next) {
  try {
    const { body } = request;

    return response.status(201).send(await dishService.create(body));
  } catch (error) {
    next(error);
  }
}

async function loadById(request, response, next) {
  try {
    const { id } = request.params;

    return response.status(201).send(await dishService.loadById({ id }));
  } catch (error) {
    next(error);
  }
}

async function list(request, response, next) {
  try {
    const { body } = request;

    return response.status(201).send(await dishService.list());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  loadById,
  list,
};
