const express = require("express");
const { CityController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlewares").CityMiddlewares;
const router = express.Router();
router.post("/", validateCreateRequest, CityController.createCity);
router.patch("/:cityId", CityController.updateCity);
router.delete("/:cityId", CityController.deleteCity);
// router.get("/", AirplaneController.getAirplanes);
// router.get("/:airplaneId", AirplaneController.getAirplane);
// router.delete("/:airplaneId", AirplaneController.deleteAirplane);
// router.patch("/:airplaneId", AirplaneController.updateAirplane);

module.exports = router;
