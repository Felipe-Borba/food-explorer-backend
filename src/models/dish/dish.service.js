const knex = require("../../database/knex");
const ingredientService = require("../ingredient/ingredient.service");

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

  return { created: true };
}

async function loadById(params) {
  const { id } = params;

  const dish = await knex("dishes").where({ id }).first();
  const ingredients = await ingredientService.listByDishId(id);

  return { dish, ingredients };
}

async function list(params) {
  // const { type } = params;

  const dishes = await knex("dishes");

  return {
    dishes,
  };
}

module.exports = {
  list,
  create,
  loadById,
};
