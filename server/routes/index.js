const API = require("./API_Routes");
const classes = require("./classes");
const schedules = require("./schedules");
const users = require("./users");
const firebaseTest = require("./firebaseTest");

const constructorMethod = (app) => {
  app.use("/", API);
  app.use("/classes", classes);
  app.use("/schedules", schedules);
  app.use("/users", users);
  app.use("/firebaseTest", firebaseTest);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
