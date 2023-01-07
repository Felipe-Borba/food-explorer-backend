const knex = require("../../database/knex");

async function createMany(params) {
  const { ingredients, dish_id } = params;

  const insertIngredients = ingredients.map((name) => ({ dish_id, name }));
  await knex("ingredients").insert(insertIngredients);
}

async function listByDishId(id) {
  return await knex("ingredients").where({ dish_id: id });
}

async function updateByDishId(params) {
  const { dishId, ingredients } = params;

  await knex("ingredients").delete().where({ dish_id: dishId });

  const insertIngredients = ingredients.map((name) => ({
    dish_id: dishId,
    name,
  }));
  await knex("ingredients").insert(insertIngredients);
}

module.exports = {
  createMany,
  listByDishId,
  updateByDishId,
};
