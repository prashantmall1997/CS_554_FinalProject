const mongoose = require("mongoose");
const User = require("../models/users");

/**
 * Creates a user within the database
 * @param {String} username The username of the user. Should be unique.
 * @param {String} email User email also for account identification. Should also be unique.
 * @returns the created object if created
 */
const create = async(username, email) => {
  try {
    const created = new User({
      username: username,
      email: email,
      schedules: [],
      admin: false
    });
    let added = await created.save();
    const user = await User.find({ username: username , email: email }).exec();
    return user;  
  }
  catch(err) {
    if(err.errors) {
      if(err.errors.username) {
          if (err.errors.username.kind === "mongoose-unique-validator") {
            throw new Error("ERROR: Username must be unique");
          }
      }
      if(err.errors.email) {
          if (err.errors.email.kind === "mongoose-unique-validator") {
            throw new Error("ERROR: Email must be unique");
          }
      }
    }
    else throw new Error(err);
  }
}

module.exports = {
  description: "User functions",
  create
}