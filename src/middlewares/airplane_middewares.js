const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app_error");
function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = `Something went wrong while creating airplane`;

    ErrorResponse.error = {
      explanation: new AppError(
        [`Model number not found in the oncoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
