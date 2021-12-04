const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      data: "This header is only shown if the user is authenticated with Firebase",
    });
  } catch (err) {
    res.json({
      error: `Issue in displaying data from server after authentication user`,
    });
  }
});

module.exports = router;
