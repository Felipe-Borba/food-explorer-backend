const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const { hash, compare } = require("bcryptjs");
const DiskStorage = require("../providers/DiskStorage");

async function create(params) {
  const { name, email, password } = params;

  const user = await knex("users").where({ name }).first();
  if (user) {
    throw new AppError({
      message: "Usuário já cadastrado",
      messageCode: 4003,
      statusCode: 403,
    });
  }

  const hashedPassword = await hash(password, 8);

  const [id] = await knex("users").insert({
    role: "customer",
    name,
    email,
    password: hashedPassword,
  });

  return { id };
}

async function logIn(data) {
  const { name, password } = data;

  const user = await knex("users").where({ name }).first();

  const error = new AppError({
    message: "usuário e/ou senha incorreta",
    statusCode: 401,
    messageCode: 4001,
  });

  if (!user) {
    throw error;
  }

  const passwordMatched = await compare(password, user.password);

  if (!passwordMatched) {
    throw error;
  }

  const { secret, expiresIn } = authConfig.jwt;
  const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn,
  });

  return { user, token };
}

async function updateInfo(params) {
  const { name, email, password } = params;
}

async function updateAvatar(params) {
  const { userId, filename } = params;

  const user = await knex("users").where({ id: userId }).first();

  if (!user) {
    throw new AppError("usuário nao encontrado", 500);
  }

  const diskStorage = new DiskStorage();
  if (user.avatar) {
    diskStorage.deleteFile(user.avatar);
  }

  const savedFilename = await diskStorage.saveFile(filename);
  user.avatar = savedFilename;

  await knex("users").update(user).where({ id: userId });

  return user;
}

module.exports = {
  create,
  updateAvatar,
  updateInfo,
  logIn,
};
