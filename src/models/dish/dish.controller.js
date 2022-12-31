const AppError = require("../../utils/AppError");
const dishService = require("./dish.service");

async function create(request, response, next) {
  try {
    const { body } = request;

    return response.status(201).send(await dishService.create(body));
  } catch (error) {
    next(error);
  }
}

async function updateDishImage(request, response, next) {
  try {
    const id = request.params.id;
    const filename = request.file?.filename;
    if (!filename) {
      throw new AppError({
        message: "Imagem não encontrada",
        messageCode: 4005,
        statusCode: 400,
      });
    }

    const result = await dishService.updateDishImage({
      image: filename,
      id,
    });

    return response.status(201).send(result);
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
  updateDishImage,
  create,
  loadById,
  list,
};
