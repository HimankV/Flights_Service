const express = require("express");
const router = express.Router();
const airplaneRoutes = require("./airplane_routes");
const cityRoutes = require("./city_routes");
const airportRoutes = require("./airport_routes");

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);

module.exports = router;
