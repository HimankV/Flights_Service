const express = require("express");
const { AirportController } = require("../../controllers");
// const { validateCreateRequest } =
//   require("../../middlewares").AirportMiddlewares;
const router = express.Router();
router.post("/", AirportController.createAirport);
router.get("/", AirportController.getAirports);
router.get("/:airplaneId", AirportController.getAirport);
router.delete("/:airplaneId", AirportController.deleteAirport);
router.patch("/:airplaneId", AirportController.updateAirplane);

module.exports = router;
