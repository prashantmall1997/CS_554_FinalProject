require("dotenv").config();
const express = require("express");
const app = express();
const configRoutes = require("./routes");

configRoutes(app);

app.listen(process.env.PORT, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on PORT ${process.env.PORT}`);
});
