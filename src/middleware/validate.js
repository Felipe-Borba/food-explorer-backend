const AppError = require("../utils/AppError");
const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${param} ${msg}`;
};

function validate(request, response, next) {
  const validateError = validationResult(request);
  if (!validateError.isEmpty()) {
    throw new AppError({
      message: validateError.formatWith(errorFormatter).array(),
      statusCode: 400,
      messageCode: 4000,
    });
  }

  next();
}

module.exports = validate;