const API = require("./API_Routes");
const classes = require("./classes");
const schedules = require("./schedules");
const users = require("./users");

const constructorMethod = (app) => {
  app.use("/API", API);
  app.use("/classes", classes);
  app.use("/schedules", schedules);
  app.use("/users", users);

  // app.use("*", (req, res) => {
  //   res.status(404).json({ error: "Not found" });
  // });
};

module.exports = constructorMethod;
