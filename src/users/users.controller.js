const usersService = require("./users.service");
const { validationResult } = require("express-validator");

async function create(request, response, next) {
  const validateError = validationResult(req);
  if (!validateError.isEmpty()) {
    return res.status(400).json({ error: validateError.array() });
  }

  const user = request.body;
  return response.send(await usersService.create(user));
}

module.exports = {
  create,
};
