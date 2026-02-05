const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app_error");
function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ((ErrorResponse.error = new AppError(
      [`name not found in the incoming request`],
      StatusCodes.BAD_REQUEST,
    )),
      res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse));
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
