const knex = require("../../database/knex");
const ingredientService = require("../ingredient/ingredient.service");
const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage");

async function create(params) {
  const {
    nome: name,
    imagem: image,
    descricao: description,
    preco: price,
    ingredientes: ingredients,
    tipo: type,
  } = params;

  const dish_id = await knex("dishes").insert({
    name,
    image,
    description,
    price,
    type,
  });
  await ingredientService.createMany({ ingredients, dish_id });

  return { created: true, id: dish_id[0] };
}

async function update(params) {
  const {
    id,
    nome: name,
    descricao: description,
    preco: price,
    ingredientes: ingredients,
    tipo: type,
  } = params;

  const dish = await knex("dishes").where({ id }).first();

  if (name) {
    dish.name = name;
  }
  if (description) {
    dish.description = description;
  }
  if (price) {
    dish.price = price;
  }
  if (type) {
    dish.type = type;
  }
  if (ingredients) {
    await ingredientService.updateByDishId({ ingredients, dishId: id });
  }

  await knex("dishes").update(dish).where({ id });

  return dish;
}

async function updateDishImage(params) {
  const { id, image } = params;

  const dish = await knex("dishes").where({ id }).first();

  if (!dish) {
    throw new AppError({
      message: "Prato nao encontrado",
      messageCode: 5001,
      statusCode: 500,
    });
  }

  const diskStorage = new DiskStorage();
  if (dish.image) {
    diskStorage.deleteFile(dish.image);
  }

  const filename = await diskStorage.saveFile(image);
  dish.image = filename;

  await knex("dishes").update(dish).where({ id });

  return dish;
}

async function loadById(params) {
  const { id } = params;

  const dish = await knex("dishes").where({ id }).first();
  const ingredients = await ingredientService.listByDishId(id);

  return { dish, ingredients };
}

async function list(params) {
  const { filter } = params;
  let query = knex("dishes");

  if (filter) {
    query = query.where("dishes.name", "like", `%${filter}%`);
  }

  const dishes = await query;
  return {
    dishes,
  };
}

async function deleteById({ id }) {
  await knex("dishes").where({ id }).delete();
}

module.exports = {
  updateDishImage,
  deleteById,
  loadById,
  update,
  create,
  list,
};
