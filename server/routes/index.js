const API = require("./API_Routes");
const classes = require("./classes");
const schedules = require("./schedules");
const users = require("./users");
const firebaseTest = require("./firebaseTest");

const constructorMethod = (app) => {
  app.use("/api", API);
  app.use("/classes", classes);
  app.use("/schedules", schedules);
  app.use("/users", users);
  app.use("/firebaseTest", firebaseTest);
};

module.exports = constructorMethod;
