const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/errors/app_error");
const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      console.log(`Here ????????`);
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      `Cannot create a new city object`,
      StatusCodes.BAD_REQUEST,
    );
  }
}

// async function getAirplanes() {
//   try {
//     const airplanes = await airplaneRepository.getAll();
//     console.log(`Airplanes: `, airplanes);
//     return airplanes;
//   } catch (error) {
//     throw new AppError(
//       `Couldn't fetch all airplanes`,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//     );
//   }
// }

// async function getAirplane(airplaneId) {
//   try {
//     const airplane = await airplaneRepository.get(airplaneId);
//     console.log(`Airplanes: `, airplane);
//     return airplane;
//   } catch (error) {
//     if (error.statusCode === StatusCodes.NOT_FOUND) {
//       throw new AppError(
//         "The airplane you requested does not exist",
//         error.statusCode,
//       );
//     }
//     throw new AppError("Cannot fetch airplane");
//   }
// }

async function deleteCity(cityId) {
  try {
    const city = await cityRepository.destroy(cityId);
    console.log(`city deleted (inside service): `, city);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The city doesn't exist ?", error.statusCode);
    }
    throw new AppError("Couldn't delete airplane");
  }
}

async function updateCity(cityId, changes) {
  try {
    const city = await cityRepository.update(cityId, changes);
    console.log(`city updated : `, city);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The airplane doesn't exist ?", error.statusCode);
    }
    throw new AppError("Couldn't delete airplane");
  }
}

module.exports = {
  createCity,
  updateCity,
  deleteCity,
  //   getAirplanes,
  //   getAirplane,
  //   deleteAirplane,
  //   updateAirplane,
};
