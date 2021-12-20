const admin = require("./../config/firebase-config");
class Middleware {
  async decodeToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(req.headers.authorization);
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      console.log("Unauthorized");
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      console.log("Internal Error - Most likely no auth token");
      return res.json({
        message: "Internal Error - Most likely no auth token",
      });
    }
  }
}

module.exports = new Middleware();
