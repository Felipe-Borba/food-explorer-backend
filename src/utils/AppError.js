class AppError {
  message;
  statusCode;
  messageCode;

  constructor({ message, statusCode = 400, messageCode }) {
    this.message = message;
    this.statusCode = statusCode;
    this.messageCode = messageCode;
  }
}

module.exports = AppError;
