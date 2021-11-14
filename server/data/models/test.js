var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// Define your schema as normal.
const kittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
});

// Apply the uniqueValidator plugin to userSchema.
kittySchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("Kitten", kittySchema);
