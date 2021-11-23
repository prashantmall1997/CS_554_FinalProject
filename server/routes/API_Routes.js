const express = require("express");
const router = express.Router();
const UserData = require("../data/controllers/user");
const ScheduleData = require("../data/controllers/schedules");
const ClassData = require("../data/controllers/classes");

router.get("/", async (req, res) => {
  try {
    //USER CONTROLLER TESTING
    //let data = await UserData.create("jperry2002", "jackperry100000@gmail.com");
    //let data = await UserData.readByUsername("jperry2002");
    //let data = await UserData.readByEmail("jackperry100000@gmail.com");
    //let data = await UserData.readAll();
    //let data = await UserData.addSchedule("jperry2002", "619be419da626506f45ce43b");
    //let data = await UserData.removeSchedule("jperry2002", "619be419da626506f45ce43b");
    //let data = await UserData.remove("jperry200020");

    //SCHEDULE CONTROLLER TESTING
    //let data = await ScheduleData.create("Schedule 1", "2022 Spring Semester (01/18/2022-05/18/2022)", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    //let data = await ScheduleData.readById("619c8f87dcbc544d65e0fec7");
    //let data = await ScheduleData.readByUser("6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    //let data = await ScheduleData.addClass("619c8f87dcbc544d65e0fec7", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    //let data = await ScheduleData.removeClass("619c8f87dcbc544d65e0fec7", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    //let data = await ScheduleData.updateName("619c8f87dcbc544d65e0fec7", "Schedule 18");
    //let data = await ScheduleData.remove("619c8f87dcbc544d65e0fec7");

    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
