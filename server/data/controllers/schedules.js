const mongoose = require("mongoose");
const Schedule = require("../models/schedules");

/**
 * Creates a schedule within the database
 * @param {String} name The name that the user has made for the schedule.
 * @param {String} time The semester timestring in which the classes will be.
 * @param {String} creator A stringified ObjectId of the user who created the schedule.
 * @returns the created object if created
 */
const create = async (name, time, creator) => {
  try {
    const created = new Schedule({
      name: name,
      time: time,
      creator: creator,
      classes: [],
    });
    let added = await created.save();
    const schedule = await Schedule.find({
      name: name,
      creator: creator,
    }).exec();
    if (schedule.length > 0) {
      return schedule[0];
    } else throw new Error("Schedule not created!");
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds a schedule in the database using an ObjectId
 * @param {String} id A stringified ObjectId of the schedule.
 * @returns the schedule object, or null if not found
 */
const readById = async (id) => {
  try {
    const schedule = await Schedule.find({ _id: id }).exec();
    if (schedule.length > 0) {
      return schedule[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds all schedules with a certain creator using the creator's ObjectId
 * @param {String} id A stringified ObjectId of the creator of the schedules
 * @returns an array of schedules, or null if none exist
 */
const readByUser = async (id) => {
  try {
    const schedules = await Schedule.find({ creator: id }).exec();
    if (schedules.length > 0) {
      return schedules;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Adds a classId to the list of classes of a schedule with a specific id
 * @param {String} id A stringified ObjectId of the schedule.
 * @param {String} classId A stringified ObjectId of a Class.
 * @returns true if the schedule is added to the array, false if not
 */
const addClass = async (id, classId) => {
  try {
    let updated = await Schedule.updateOne(
      { _id: id },
      { $addToSet: { classes: classId } }
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
 * Removes a classId from the list of classes of a schedule with a specific id
 * @param {String} id A stringified ObjectId of the schedule.
 * @param {String} classId A stringified ObjectId of a Class.
 * @returns true if the schedule is remove from the array, false if not
 */
const removeClass = async (id, classId) => {
  try {
    let updated = await Schedule.updateOne(
      { _id: id },
      { $pullAll: { classes: [classId] } }
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
 * Updates the name of the specified schedule with a specific id
 * @param {String} id A stringified ObjectId of the schedule.
 * @param {String} name A new name for the schedule.
 * @returns true if the schedule is updated, false if not
 */
const updateName = async (id, name) => {
  try {
    let updated = await Schedule.updateOne({ _id: id }, { name: name }).exec();
    if (updated.modifiedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Removes a schedule from the database
 * @param {String} id A stringified ObjectId of the schedule.
 * @returns true if the schedule is removed, false if not
 */
const remove = async (id) => {
  try {
    let removed = await Schedule.deleteOne({ _id: id }).exec();
    if (removed.deletedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  description: "Schedule functions",
  create,
  readById,
  readByUser,
  addClass,
  removeClass,
  updateName,
  remove,
};
