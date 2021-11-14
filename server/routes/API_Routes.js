const express = require("express");
const router = express.Router();
const KittenData = require("../data/controllers/test");

router.get("/", async (req, res) => {
  try {
    let dataDB = await KittenData.create();
    // console.log(dataDB);
    res.send("WELCOME " + dataDB[0].name);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
