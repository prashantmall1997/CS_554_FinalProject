const express = require("express");
const router = express.Router();
const UserData = require('../data/controllers/user');
const ScheduleData = require('../data/controllers/schedules');

router.get("/", async (req, res) => {
  try {
    let dataDB = await ScheduleData.create();

    // console.log(dataDB);
    res.send("created " + dataDB[0].name);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
