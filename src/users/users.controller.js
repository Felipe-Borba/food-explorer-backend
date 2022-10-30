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

async function updateAvatar(request, response, next) {
  try {
    const userId = request.user.id;
    const avatarFilename = request.file.filename;

    const body = request.body;
    return response.status(200).send(await usersService.updateAvatar(body));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  logIn,
  updateAvatar,
};
