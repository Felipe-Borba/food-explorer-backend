const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  const authCookie = request.cookies["Authorization"];
  const auth = authHeader ?? authCookie;

  if (!auth) {
    throw new AppError({
      message: "jwt token não informado",
      statusCode: 401,
      messageCode: 4002,
    });
  }

  const [, token] = auth.split(" ");

  try {
    const { sub: userId } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(userId),
    };

    return next();
  } catch (error) {
    throw new AppError({
      message: "jwt token invalido",
      statusCode: 401,
      messageCode: 4004,
    });
  }
}

module.exports = ensureAuthenticated;
