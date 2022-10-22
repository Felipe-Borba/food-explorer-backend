const knex = require("../database/knex");

async function create(user) {
  const { name, role, email, password } = user;

  const [id] = await knex("users").insert({ name, role, email, password });
  return { id };
}

module.exports = {
  create,
};
