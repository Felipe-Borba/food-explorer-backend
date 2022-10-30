const knex = require("./index");
const path = require("path");

function latest() {
  knex.migrate.latest({
    directory: [
      path.resolve(__dirname, "users", "migrations"),
      path.resolve(__dirname, "dish", "migrations"),
    ],
  });
}

module.exports = {
  latest,
};
