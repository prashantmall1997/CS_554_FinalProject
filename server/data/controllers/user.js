const mongoose = require("mongoose");
const User = require("../models/users");

//CREATE
exports.create = async function (req, res) {
  try {
    const jackson = new User({ username: "jperry", email: "jperry1@stevens.edu", schedules: [], admin: true });
    jackson.save((err) => {
      if (err) {
        if(err.errors.username) {
            if (err.errors.username.kind === "mongoose-unique-validator") {
            console.log("ERROR: Username must be unique");
            }
        }
        if(err.errors.email) {
            if (err.errors.email.kind === "mongoose-unique-validator") {
                console.log("ERROR: Email must be unique");
            }
        }
      }
    });
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};
