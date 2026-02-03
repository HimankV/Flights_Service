const express = require("express");
const { AirplaneController } = require("../../controllers");
const { validateCreateRequest } =
  require("../../middlewares").AirplaneMiddlewares;
const router = express.Router();
router.post("/", validateCreateRequest, AirplaneController.createAirplane);
router.get("/", AirplaneController.createAirplane);

module.exports = router;
