const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories/");
const AppError = require("../utils/errors/app_error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(explanation, StatusCodes.BAD_REQUEST);
  }
}

async function getAllFlights(query) {
  // trips=MUM-DEL
  console.log(`query : `, query);
  console.log(`query.trips : `, query.trips);
  let customFilter = {};
  let sortFilter = [];
  if (query.trips) {
    console.log(`here ?`);
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.arrivalAirportId = arrivalAirportId;
    customFilter.departureAirportId = departureAirportId;
    console.log(departureAirportId, arrivalAirportId);
    // TODO: check if departureAirportId & arrivalAirportId are not same
  }
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice === undefined ? 100000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + " 23:59:59"],
    };
  }

  if (query.sort) {
    console.log(`query.sort : `, query.sort);
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));

    console.log(`sortFilters : `, sortFilters);
    sortFilter = sortFilters;
    console.log(`sortFilter : `, sortFilter);
  }

  console.log(`customFilter : `, customFilter);

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter,
    );
    console.log(`flights : `, flights);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getFlight(flightId) {
  try {
    const flight = await flightRepository.get(flightId);
    console.log(`flight: `, flight);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested does not exist",
        error.statusCode,
      );
    }
    throw new AppError("Cannot fetch flight");
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError("Cannot update seats of flight");
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
