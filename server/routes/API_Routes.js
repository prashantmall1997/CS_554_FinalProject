const express = require("express");
const router = express.Router();
const UserData = require('../data/controllers/user');
const ScheduleData = require('../data/controllers/schedules');
const ClassData = require('../data/controllers/classes');

router.get("/", async (req, res) => {
  try {
    //let data = await UserData.create("jperry2002", "jackperry100000@gmail.com");
    //let data = await UserData.readByUsername("jperry2002");
    //let data = await UserData.readByEmail("jackperry100000@gmail.com");
    //let data = await UserData.readAll();
    //let data = await UserData.addSchedule("jperry2002", "619be419da626506f45ce43b");
    //let data = await UserData.removeSchedule("jperry2002", "619be419da626506f45ce43b");
    let data = await UserData.remove("jperry200020");

    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
