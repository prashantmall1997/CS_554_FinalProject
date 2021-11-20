const express = require("express");
const router = express.Router();
const UserData = require('../data/controllers/user');
const ScheduleData = require('../data/controllers/schedules');
const ClassData = require('../data/controllers/classes');

router.get("/", async (req, res) => {
  try {
    let dataDB = await ClassData.create();

    // console.log(dataDB);
    res.send("created " + dataDB[0].courseSection);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
