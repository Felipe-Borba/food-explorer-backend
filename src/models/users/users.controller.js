const usersService = require("./users.service");

async function create(request, response, next) {
  try {
    const user = request.body;
    return response.status(201).send(await usersService.create(user));
  } catch (error) {
    next(error);
  }
}

async function logIn(request, response, next) {
  try {
    const user = request.body;
    const session = await usersService.logIn(user);
    response.header("Authorization", `Bearer ${session.token}`);
    response.cookie("Authorization", `Bearer ${session.token}`);
    return response.status(200).send(session);
  } catch (error) {
    next(error);
  }
}

async function promote(request, response, next) {
  try {
    const { myDict } = request.query;
    const { id } = request.user;

    return response.status(200).send(await usersService.promote({ userId: id, key: myDict }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  promote,
  create,
  logIn,
};
