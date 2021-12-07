const express = require("express");
const router = express.Router();
const UserData = require("../data/controllers/user");
const ScheduleData = require("../data/controllers/schedules");
const ClassData = require("../data/controllers/classes");

router.get("/test", async (req, res) => {
  //   try {
  // USER CONTROLLER TESTING
  // let data = await UserData.create("jperry2002", "jackperry100000@gmail.com");
  // let data = await UserData.readByUsername("jperry2002");
  // let data = await UserData.readByEmail("jackperry100000@gmail.com");
  // let data = await UserData.readAll();
  // let data = await UserData.addSchedule("jperry2002", "619be419da626506f45ce43b");
  // let data = await UserData.removeSchedule("jperry2002", "619be419da626506f45ce43b");
  // let data = await UserData.remove("jperry200020");
  // SCHEDULES CONTROLLER TESTING
  // let data = await ScheduleData.create("Schedule 1", "2022 Spring Semester (01/18/2022-05/18/2022)", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
  // let data = await ScheduleData.readById("619c8f87dcbc544d65e0fec7");
  // let data = await ScheduleData.readByUser("6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
  // let data = await ScheduleData.addClass("619c8f87dcbc544d65e0fec7", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
  // let data = await ScheduleData.removeClass("619c8f87dcbc544d65e0fec7", "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
  // let data = await ScheduleData.updateName("619c8f87dcbc544d65e0fec7", "Schedule 18");
  // let data = await ScheduleData.remove("619c8f87dcbc544d65e0fec7");
  // CLASSES CONTROLLER TESTING
  // let data = await ClassData.create(
  //   "2022 Spring Semester (01/18/2022-05/18/2022)",
  //   "Undergraduate",
  //   "ACC 421-A - Auditing",
  //   "ACC",
  //   "421",
  //   "A",
  //   "Auditing",
  //   "Open",
  //   "Andrea Rozario",
  //   "Tuesday/Thursday | 11:00 AM - 12:15 PM",
  //   "WebCampus",
  //   "Lecture",
  //   "In-Person",
  //   "0/25",
  // );
  // let data = await ClassData.readById("619c9a0e480dcc4e1fd9bbcd");
  // let data = await ClassData.readByCourseTime("2022 Spring Semester (01/18/2022-05/18/2022)");
  // let data = await ClassData.readByCourseTotal("ACC 421-A - Auditing");
  // let data = await ClassData.readAll();
  // let data = await ClassData.updateOrInsertByCourseTotal(
  //   "2022 Spring Semester (01/18/2022-05/18/2022)",
  //   "Graduate",
  //   "ACD 422-B - Auditing",
  //   "ACD",
  //   "422",
  //   "B",
  //   "Auditing",
  //   "Open",
  //   "Andrea Rozario",
  //   "Tuesday/Thursday | 11:00 AM - 12:15 PM",
  //   "WebCampus",
  //   "Lecture",
  //   "In-Person",
  //   "0/25",
  // )
  // let data = await ClassData.removeById("619c9b98b601774bfc92c017");
  // let data = await ClassData.removeAll();
  //     console.log(data);
  //     res.send(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
});

module.exports = router;
