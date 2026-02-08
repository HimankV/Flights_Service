const express = require("express");
const { FlightController } = require("../../controllers");
const { validateCreateRequest, validateUpdateSeatsRequest } =
  require("../../middlewares").FlightMiddlewares;
const router = express.Router();

/* 
    POST    /api/v1/flights
*/
router.post("/", validateCreateRequest, FlightController.createFlight);

/* 
    GET    /api/v1/flights?trip=MUM-DEL&sort=price_ASC
*/
router.get("/", FlightController.getAllFlights);

/* 
    GET    /api/v1/flights/:flightId
*/
router.get("/:flightId", FlightController.getFlight);

/* 
    GET    /api/v1/flights/:flightId
*/
router.patch(
  "/:flightId/seats",
  validateUpdateSeatsRequest,
  FlightController.updateSeats,
);

module.exports = router;
