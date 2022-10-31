const knex = require("./index");
const path = require("path");

function latest() {
  knex.migrate.latest({
    directory: [
      path.resolve(__dirname, "..", "..", "models", "users", "migrations"),
      path.resolve(__dirname, "..", "..", "models", "dish", "migrations"),
    ],
  });
}

module.exports = {
  latest,
};
