const mongoose = require("mongoose");
const Schedule = require("../models/schedules");

//CREATE
exports.create = async function (req, res) {
  try {
    const jackson = new Schedule({ name: "Schedule 2", time: "2022 Spring Semester (01/18/2022-05/18/2022)", classes: [], creator: "6b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310" });
    jackson.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    const schedules = await Schedule.find();
    return schedules;
  } catch (err) {
    console.log(err);
  }
};
