const mongoose = require("mongoose");
const Class = require("../models/classes");

/**
 * Creates a class within the database
 * @param {String} courseTime A semester timestring of when the class is in.
 * @param {String} courseLevel “Graduate”, “Undergraduate”, “Doctoral”, “Non-Degree”, or “Certificate Programs”.
 * @param {String} courseTotal Long title with section and course code.
 * @param {String} coursePrefix Subject (“CS”, “CH”, “BIO”, “ACC”, etc.) of the course.
 * @param {String} courseCode Exact code of the course (Would be "546" for CS546A).
 * @param {String} courseSection Exact section of the course (Would be "A" for CS546A).
 * @param {String} courseTitle Short title with only name of course (Web Development I).
 * @param {String} sectionStatus “Open” or “Closed”.
 * @param {String} instructor Teacher of the course section.
 * @param {String} sectionDetails Empty, a string with WebCampus in it, or a string with days and times the course section is offered.
 * @param {String} campus “”, “WebCampus”, or “Hoboken - Main Campus”.
 * @param {String} format “Lecture”, “Thesis”, “Workshop”, “Recitation”, “Laboratory”, “Combination”, or “Seminar”.
 * @param {String} deliveryMode “In-Person” or “Online”.
 * @param {String} enrolledCapacity numberEnrolled + “/” + capacity.
 * @returns the created object if created
 */
const create = async (
  courseTime,
  courseLevel,
  courseTotal,
  coursePrefix,
  courseCode,
  courseSection,
  courseTitle,
  sectionStatus,
  instructor,
  sectionDetails,
  campus,
  format,
  deliveryMode,
  enrolledCapacity
) => {
  try {
    const created = new Class({
      courseTime: courseTime,
      courseLevel: courseLevel,
      courseTotal: courseTotal,
      coursePrefix: coursePrefix,
      courseCode: courseCode,
      courseSection: courseSection,
      courseTitle: courseTitle,
      sectionStatus: sectionStatus,
      instructor: instructor,
      sectionDetails: sectionDetails,
      campus: campus,
      format: format,
      deliveryMode: deliveryMode,
      enrolledCapacity: enrolledCapacity,
    });
    let added = await created.save();
    const theClass = await Class.find({ courseTotal: courseTotal }).exec();
    if (theClass.length > 0) {
      return theClass[0];
    } else throw new Error("Class not created!");
  } catch (err) {
    if (err.errors) {
      if (err.errors.courseTotal) {
        if (err.errors.courseTotal.kind === "mongoose-unique-validator") {
          console.log("ERROR: courseTotal must be unique");
        }
      }
    } else throw new Error(err);
  }
};

/**
 * Finds a class in the database using a stringified ObjectId
 * @param {String} id A stringified ObjectId of the class.
 * @returns the class object, or null if not found
 */
const readById = async (id) => {
  try {
    const theClass = await Class.find({ _id: id }).exec();
    if (theClass.length > 0) {
      return theClass[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds all classes in the database pertaining to a specific semester timestring
 * @param {String} courseTime A semester timestring of when the classes are in.
 * @returns an array of class objects, or null if not found
 */
const readByCourseTime = async (courseTime) => {
  try {
    const classes = await Class.find({ courseTime: courseTime }).exec();
    if (classes.length > 0) {
      return classes;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds a class in the database using a courseTotal string
 * @param {String} courseTotal Long title with section and course code.
 * @returns the class object, or null if not found
 */
const readByCourseTotal = async (courseTotal) => {
  try {
    const theClass = await Class.find({ courseTotal: courseTotal }).exec();
    if (theClass.length > 0) {
      return theClass[0];
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Finds all of the classes in the database
 * @returns an array of class objects, or null if there are no classes
 */
const readAll = async () => {
  try {
    const classes = await Class.find({}).exec();
    if (classes.length > 0) {
      return classes;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Updates a class with a specified courseTotal within the database - if it is not already in the database, it creates it instead
 * @param {String} courseTime A semester timestring of when the class is in.
 * @param {String} courseLevel “Graduate”, “Undergraduate”, “Doctoral”, “Non-Degree”, or “Certificate Programs”.
 * @param {String} courseTotal Long title with section and course code.
 * @param {String} coursePrefix Subject (“CS”, “CH”, “BIO”, “ACC”, etc.) of the course.
 * @param {String} courseCode Exact code of the course (Would be "546" for CS546A).
 * @param {String} courseSection Exact section of the course (Would be "A" for CS546A).
 * @param {String} courseTitle Short title with only name of course (Web Development I).
 * @param {String} sectionStatus “Open” or “Closed”.
 * @param {String} instructor Teacher of the course section.
 * @param {String} sectionDetails Empty, a string with WebCampus in it, or a string with days and times the course section is offered.
 * @param {String} campus “”, “WebCampus”, or “Hoboken - Main Campus”.
 * @param {String} format “Lecture”, “Thesis”, “Workshop”, “Recitation”, “Laboratory”, “Combination”, or “Seminar”.
 * @param {String} deliveryMode “In-Person” or “Online”.
 * @param {String} enrolledCapacity numberEnrolled + “/” + capacity.
 * @returns true if the class is updated or, false if not
 */
const updateOrInsertByCourseTotal = async (
  courseTime,
  courseLevel,
  courseTotal,
  coursePrefix,
  courseCode,
  courseSection,
  courseTitle,
  sectionStatus,
  instructor,
  sectionDetails,
  campus,
  format,
  deliveryMode,
  enrolledCapacity
) => {
  try {
    let updated = await Class.updateOne(
      { courseTotal: courseTotal },
      {
        courseTime: courseTime,
        courseLevel: courseLevel,
        courseTotal: courseTotal,
        coursePrefix: coursePrefix,
        courseCode: courseCode,
        courseSection: courseSection,
        courseTitle: courseTitle,
        sectionStatus: sectionStatus,
        instructor: instructor,
        sectionDetails: sectionDetails,
        campus: campus,
        format: format,
        deliveryMode: deliveryMode,
        enrolledCapacity: enrolledCapacity,
      },
      { upsert: true }
    ).exec();
    if (updated.modifiedCount == 1 || updated.upsertedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Removes a class from the database
 * @param {String} id A stringified ObjectId of the class.
 * @returns true if the class is removed, false if not
 */
const removeById = async (id) => {
  try {
    let removed = await Class.deleteOne({ _id: id }).exec();
    if (removed.deletedCount == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Removes all classes from the database
 * @returns true if the classes are removed, false if not or if the database was empty
 */
const removeAll = async () => {
  try {
    let removed = await Class.deleteMany({}).exec();
    if (removed.deletedCount > 0) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  description: "Class functions",
  create,
  readById,
  readByCourseTime,
  readByCourseTotal,
  readAll,
  updateOrInsertByCourseTotal,
  removeById,
  removeAll,
};
