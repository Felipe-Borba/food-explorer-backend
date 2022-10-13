const app = require("./app");

const PORT = 3000; //TODO change to env var
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));