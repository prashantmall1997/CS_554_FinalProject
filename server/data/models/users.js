var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// Define your schema as normal.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    schedules: [{ type: String, required: true, unique: false }],
    admin: { type: Boolean, required: true, unique: false },
  },
  { collection: "users" }
);

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("User", userSchema);
