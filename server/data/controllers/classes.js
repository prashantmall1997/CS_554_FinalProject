const mongoose = require("mongoose");
const Class = require("../models/classes");

//CREATE
exports.create = async function (req, res) {
  try {
    const cs546 = new Class({ 
        courseTime: "2022 Spring Semester (01/18/2022-05/18/2022)",
        courseLevel: "Undergraduate",
        courseTotal: "ACC 421-A - Auditing",
        coursePrefix: "ACC",
        courseCode: "421",
        courseSection: "A",
        courseTitle: "Auditing",
        sectionStatus: "Open",
        instructor: "Andrea Rozario",
        sectionDetails: "Tuesday/Thursday | 11:00 AM - 12:15 PM",
        campus: "WebCampus",
        format: "Lecture",
        deliveryMode: "In-Person",
        enrolledCapacity: "0/25"
    });
    cs546.save((err) => {
      if (err) {
        if(err.errors.courseTotal) {
            if (err.errors.courseTotal.kind === "mongoose-unique-validator") {
            console.log("ERROR: courseTotal must be unique");
            }
        }
      }
    });
    const classes = await Class.find();
    return classes;
  } catch (err) {
    console.log(err);
  }
};
