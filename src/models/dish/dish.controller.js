const dishService = require("./dish.service");

async function create(params) {
  try {
    const { body } = request;

    return response.status(201).send(await dishService.create(body));
  } catch (error) {
    next(error);
  }
}

async function loadById(params) {
  try {
    const { id } = request.params;

    return response.status(201).send(await dishService.loadById({ id }));
  } catch (error) {
    next(error);
  }
}

async function updateById(params) {
  try {
    const { body } = request;

    return response.status(201).send(await dishService.updateById(body));
  } catch (error) {
    next(error);
  }
}

async function deleteById(params) {
  try {
    const { id } = request.params;

    return response.status(201).send(await dishService.deleteById({ id }));
  } catch (error) {
    next(error);
  }
}

async function list(params) {
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
  updateById,
  deleteById,
  list,
};
