const express = require("express");
const router = express.Router();
const UserData = require('../data/controllers/user');

router.get("/", async (req, res) => {
  try {
    let dataDB = await UserData.create();

    // console.log(dataDB);
    res.send("WELCOME " + dataDB[0].username);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
