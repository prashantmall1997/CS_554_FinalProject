require("dotenv").config();
let mongoose = require("mongoose");

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
