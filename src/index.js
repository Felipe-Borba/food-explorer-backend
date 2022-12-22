require("dotenv/config");
const app = require("./app");
const migration = require('./database/knex/migration');

migration.latest();

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('não esqueça no arquivo .env')
}
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
