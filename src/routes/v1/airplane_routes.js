const express = require("express");
const { AirplaneController } = require("../../controllers");
const { validateCreateRequest } =
  require("../../middlewares").AirplaneMiddlewares;
const router = express.Router();
router.post("/", validateCreateRequest, AirplaneController.createAirplane);
router.get("/", AirplaneController.getAirplanes);
router.get("/:airplaneId", AirplaneController.getAirplane);
router.delete("/:airplaneId", AirplaneController.deleteAirplane);
router.patch("/:airplaneId", AirplaneController.updateAirplane);

module.exports = router;
