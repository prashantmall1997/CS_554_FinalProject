const mongoose = require("mongoose");
const lastUpdated = require("../models/lastUpdated");

/**
 * Finds and returns the lastUpated object
 * @returns a lastUpdated object
 */
const read = async () => {
    try {
        let obj = await lastUpdated.find({}).exec();
        if (obj.length > 0) {
            obj = obj[0];
            return obj;
        } else throw new Error("lastUpdated object has not been initialized within the database")
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * Updates lastUpdated's classes field
 * @param {Date} classDate The new classDate
 * returns true if updated, false if not
 */
const updateClasses = async (classDate) => {
    try {
        let updated = await lastUpdated.updateMany({}, { classes: classDate }).exec();
        if (updated.modifiedCount == 1) {
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    description: "lastUpdated functions",
    read,
    updateClasses,
};
