const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const { hash, compare } = require("bcryptjs");

async function create(params) {
  const { name, email, password, role } = params;

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
    role,
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

module.exports = {
  create,
  logIn,
};
