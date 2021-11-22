const express = require("express");
const router = express.Router();
const UserData = require('../data/controllers/user');
const ScheduleData = require('../data/controllers/schedules');
const ClassData = require('../data/controllers/classes');

router.get("/", async (req, res) => {
  try {
    let dataDB = await UserData.create("jperry2002", "jackperry100000@gmail.com");

    console.log(dataDB);
    res.send({ message: "created " + dataDB });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
