const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError({
      message: "jwt token não informado",
      statusCode: 401,
      messageCode: 4002,
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch (error) {
    throw new AppError("jwt token invalido", 401);
  }
}

module.exports = ensureAuthenticated;
