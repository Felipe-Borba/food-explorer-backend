const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");
const { sign } = require("jsonwebtoken");
const authConfig = require("../../configs/auth");
const { hash, compare } = require("bcryptjs");

async function create(params) {
  const { nome: name, email, senha: password } = params;

  const user = await knex("users").where({ email }).first();
  if (user) {
    throw new AppError({
      message: "Email já cadastrado",
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
  const { email, senha: password } = data;

  const user = await knex("users").where({ email }).first();

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

async function promote(params) {
  const { userId, key } = params;
  const error = new AppError({
    message: "jwt token invalido",
    statusCode: 401,
    messageCode: 4004,
  });

  if (!process.env.PROMOTION_KEY || key !== process.env.PROMOTION_KEY) {
    throw error;
  }

  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    throw error;
  }

  user.role = "admin";
  await knex("users").update(user).where({ id: userId });
}

module.exports = {
  promote,
  create,
  logIn,
};
