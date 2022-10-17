const usersService = require("./users.service");

async function create(request, response, next) {
  const user = request.body;

  return response.send(await usersService.create(user));
}

module.exports = {
  create,
};
