require("dotenv/config");
const app = require("./app");
const knex = require("./database/knex/index");
const path = require("path");

knex.migrate.latest({
  directory: [path.resolve(__dirname, "users", "migrations"),]
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
