const API = require("./API_Routes");
const classes = require("./classes");
const schedules = require("./schedules");
const users = require("./users");
const firebase = require("./firebase");
const lastUpdated = require("./lastUpdated");

const constructorMethod = (app) => {
  app.use("/api", API);
  app.use("/classes", classes);
  app.use("/schedules", schedules);
  app.use("/users", users);
  app.use("/firebase", firebase);
  app.use("/lastUpdated", lastUpdated);
};

module.exports = constructorMethod;
