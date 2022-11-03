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

  for (const name of ingredients) {
    await knex("dishes").update({ name }).where({ dish_id: dishId });
  }
}

module.exports = {
  createMany,
  listByDishId,
  updateByDishId,
};
