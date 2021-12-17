const mongoose = require("mongoose");
const User = require("../models/users");

/**
 * Creates a user within the database
 * @param {String} username The username of the user. Should be unique.
 * @param {String} email User email also for account identification. Should also be unique.
 * @param {String} CWID the users campus wide ID number in string form
 * @returns the created object if created
 */
const create = async (username, email, CWID) => {
  try {
    const created = new User({
      username: username,
      email: email,
      schedules: [],
      admin: false,
      CWID: CWID,
    });
    let added = await created.save();
    const user = await User.find({ username: username, email: email, CWID: CWID }).exec();
    if (user.length > 0) {
      return user[0];
    } else throw new Error("User not created!");
  } catch (err) {
    if (err.errors) {
      if (err.errors.username) {
        if (err.errors.username.kind === "mongoose-unique-validator") {
          throw new Error("ERROR: Username must be unique");
        }
      }
      if (err.errors.email) {
        if (err.errors.email.kind === "mongoose-unique-validator") {
          throw new Error("ERROR: Email must be unique");
        }
      }
    } else throw new Error(err);
  }
};

/**
 * Finds a user in the database using a username
 * @param {String} username The username of the user.
 * @returns the user object, or null if not found
 */
const readByUsername = async (username) => {
  try {
    const user = await User.find({ username: username }).exec();
    if (user.length > 0) {
      return user[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds a user in the database using an email
 * @param {String} email The email of the user.
 * @returns the user object, or null if not found
 */
const readByEmail = async (email) => {
  try {
    const user = await User.find({ email: email }).exec();
    if (user.length > 0) {
      return user[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds all of the users in the database
 * @returns an array of user objects, or null if there are no users
 */
const readAll = async () => {
  try {
    const users = await User.find({}).exec();
    if (users.length > 0) {
      return users;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Adds a scheduleId to the list of schedules of a user with a specific username
 * @param {String} username The username of the user.
 * @param {String} scheduleId A stringified ObjectId of a Schedule.
 * @returns true if the schedule is added to the array, false if not
 */
const addSchedule = async (username, scheduleId) => {
  try {
    let updated = await User.updateOne(
      { username: username },
      { $addToSet: { schedules: scheduleId } }
    ).exec();
    if (updated.modifiedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Removes a scheduleId from the list of schedules of a user with a specific username
 * @param {String} username The username of the user.
 * @param {String} scheduleId A stringified ObjectId of a Schedule.
 * @returns true if the schedule is remove from the array, false if not
 */
const removeSchedule = async (username, scheduleId) => {
  try {
    let updated = await User.updateOne(
      { username: username },
      { $pullAll: { schedules: [scheduleId] } }
    ).exec();
    if (updated.modifiedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Removes a user from the database
 * @param {String} username The username of the user.
 * @returns true if the user is removed, false if not
 */
const remove = async (username) => {
  try {
    let removed = await User.deleteOne({ username: username }).exec();
    if (removed.deletedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Updates a user within the database
 * @param {String} username The username of the user. Should be unique.
 * @param {String} email User email also for account identification. Should also be unique.
 * @param {String} CWID the users campus wide ID number in string form
 * @returns the created object if updated
 */
const update = async (username, email, CWID) => {
  try {
    let updated = await User.updateOne(
      { CWID: CWID },
      { $set: { username: username, email: email } }
    ).exec();
    if (updated.modifiedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds a user in the database using CWID
 * @param {String} CWID The campus wide ID of the user.
 * @returns the user object, or null if not found
 */
const readByCWID = async (CWID) => {
  try {
    const user = await User.find({ CWID: CWID }).exec();
    if (user.length > 0) {
      return user[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  description: "User functions",
  create,
  readByUsername,
  readByEmail,
  readAll,
  addSchedule,
  removeSchedule,
  remove,
  update,
  readByCWID,
};
