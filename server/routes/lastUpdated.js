const express = require("express");
const router = express.Router();
const lastUpdatedData = require("../data/controllers/lastUpdated");

router.get("/", async (req, res) => {
  try {
    //returns the lastUpdated object
    let data = await lastUpdatedData.read();
    res.json(data);
  } catch (err) {
    res.json({ error: `${err}` });
  }
});

router.post('/updateClasses', async (req, res) => {
    try {
        //Takes in username, email, cwid 
        //returns the updated user 
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        
        let classes = new Date(body.classes);

        if (!classes) throw new Error("must provide classes");
        if (!(classes instanceof Date) || isNaN(classes)) throw new Error("Classes must be a valid Date")

        let data = await lastUpdatedData.updateClasses(classes);
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    } 
});


module.exports = router;

