var mongoose = require("mongoose");

// Define your schema as normal.
const scheduleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: false },
    time: { type: String, required: true, unique: false },
    creator: { type: String, required: true, unique: false },
    classes: [{ type: Boolean, required: true, unique: false }]
}, { collection: 'schedules'});

module.exports = mongoose.model("Schedule", scheduleSchema);
