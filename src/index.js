const express = require("express");
const { PORT } = require("./config").ServerConfig;
const apiRoutes = require("./routes");
const { Logger } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on https://localhost:${PORT}`);
  Logger.info(`Successfully started the server`, `root`, {});
  // const { City, Airport } = require("./models");
  // console.log("here? 1");
  // const city = await City.findByPk(35);
  // // console.log(`city : `, city);
  // // city.createAirport({ name: "New York Airport 3", code: "NY3" });
  // // const NY = await Airport.findByPk(1);
  // // await city.removeAirport(NY);
  // await City.destroy({
  //   where: { id: 35 },
  // });
  //
  //
});
