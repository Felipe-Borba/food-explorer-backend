const knex = require("../database/knex");
const ingredientService = require("../ingredient/ingredient.service");

async function create(params) {
  const { name, image, description, price, ingredients } = params;

  const dish_id = await knex("dishes").insert({
    name,
    image,
    description,
    price,
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

async function updateById(params) {
  const { id, name, image, description, price, ingredients } = params;

  await knex("dishes")
    .update({ name, image, description, price })
    .where({ id });
  await ingredientService.updateByDishId({ dishId: id, ingredients });

  return {};
}

async function deleteById(id) {
  const { id } = params;

  await knex("dishes").where({ id }).delete();

  return {};
}

//TODO add pagination
async function list(params) {
  const dishes = await knex('dishes')

  return {
    dishes
  }
}

module.exports = {
  list,
  create,
  loadById,
  updateById,
  deleteById,
};
