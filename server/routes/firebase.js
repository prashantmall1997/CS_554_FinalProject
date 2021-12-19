const express = require("express");
const router = express.Router();
const admin = require("./../config/firebase-config");

let defaultAuth = admin.auth();

router.post("/deleteUserByEmailFirebase", async (req, res) => {
  try {
    let userData = await defaultAuth.getUserByEmail(req.body.email);
    // console.log(userData.uid);
    await defaultAuth.deleteUser(userData.uid);
    res.json({ message: "user deleted" });
  } catch (err) {
    // console.log(err);
    res.json({
      error: `Issue in getting user data by email.`,
    });
  }
});

module.exports = router;
