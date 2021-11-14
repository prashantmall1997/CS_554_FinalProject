var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(
      process.env.DB_PASSWORD
    )}@cluster0.miv6m.mongodb.net/SIT_SCHEDULER_V2?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    // console.log(err);
    console.error("Database connection error");
  });

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
