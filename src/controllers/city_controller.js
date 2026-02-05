const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    console.log(`city : `, city);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(`error_______ `, error);
    ErrorResponse.error = error;
    console.log(`ErrorResponse : `, ErrorResponse);
    console.log(`error.statusCode : `, error.statusCode);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const cityId = req.params.cityId;
    const changes = req.body;
    console.log(`cityId, changes : `, cityId, " | ", changes);
    const city = await CityService.updateCity(cityId, changes);
    console.log(`City updated : `, city);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteCity(req, res) {
  try {
    console.log(`here? 1`);
    const cityId = req.params.cityId;
    const city = await CityService.deleteCity(cityId);
    console.log(`here? 2`);
    console.log(`city deleted : `, city);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  updateCity,
  deleteCity,
};
