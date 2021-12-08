var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// Define your schema as normal.
const classSchema = new mongoose.Schema(
  {
    courseTime: { type: String, required: true, unique: false },
    courseLevel: { type: String, required: true, unique: false },
    courseTotal: { type: String, required: true, unique: true },
    coursePrefix: { type: String, required: true, unique: false },
    courseCode: { type: String, required: true, unique: false },
    courseSection: { type: String, required: true, unique: false },
    courseTitle: { type: String, required: true, unique: false },
    sectionStatus: { type: String, required: true, unique: false },
    instructor: { type: String, required: true, unique: false },
    sectionDetails: { type: String, required: true, unique: false },
    campus: { type: String, required: true, unique: false },
    format: { type: String, required: true, unique: false },
    deliveryMode: { type: String, required: true, unique: false },
    enrolledCapacity: { type: String, required: true, unique: false },
  },
  { collection: "classes" }
);

// Apply the uniqueValidator plugin to classSchema.
classSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("Class", classSchema);
