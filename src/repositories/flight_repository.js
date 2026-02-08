const CrudRepository = require("./crud_repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");

const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sortFilter) {
    console.log(`filter : `, filter);
    const response = await Flight.findAll({
      where: filter,
      order: sortFilter,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code"),
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code"),
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(
      `Select * from Flights where Flights.id=${flightId} FOR UPDATE;`,
    );
    const flight = await Flight.findByPk(flightId);
    console.log(`dec : `, dec);
    if (dec) {
      await flight.decrement("totalSeats", { by: seats });
    } else {
      await flight.increment("totalSeats", { by: seats });
    }
    return Flight.findByPk(flightId);
  }
}

module.exports = FlightRepository;
