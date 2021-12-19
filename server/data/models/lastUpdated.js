var mongoose = require("mongoose");

// Define your schema as normal.
const lastUpdatedSchema = new mongoose.Schema(
  {
    classes: { type: Date, required: true, unique: false },
  },
  { collection: "lastUpdated" }
);

module.exports = mongoose.model("lastUpdated", lastUpdatedSchema);
