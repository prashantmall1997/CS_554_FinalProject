const express = require("express");
const router = express.Router();
const UserData = require("../data/controllers/user");

router.get("/", async (req, res) => {
    // USER CONTROLLER TESTING
    // let data = await UserData.create("jperry2002", "jackperry100000@gmail.com");
    // let data = await UserData.readByUsername("jperry2002");
    // let data = await UserData.readByEmail("jackperry100000@gmail.com");
    // let data = await UserData.readAll();
    // let data = await UserData.addSchedule("jperry2002", "619be419da626506f45ce43b");
    // let data = await UserData.removeSchedule("jperry2002", "619be419da626506f45ce43b");
    // let data = await UserData.remove("jperry200020");
    //Responds with a list of all user objects
    try {
        let data = await UserData.readAll();
        res.json(data);
    }
    catch(error) {
        res.json({ error: error });
    }
});

router.post("/create", async (req, res) => {
    try {
        //Takes in a username and email, creates a user in the database, returns the created object
        let body = req.body;
        let username = body.username;
        let email = body.email;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");
        if(!email) throw new Error("must provide an email");
        if(typeof email != "string" || email.replace(/\s/g, '') == "") throw new Error("email must be a valid string");
        
        let data = await UserData.create(username, email);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByUsername", async (req, res) => {

});

router.post("/readByEmail", async (req, res) => {

});

router.post("/addSchedule", async (req, res) => {

});

router.post("/removeSchedule", async (req, res) => {

});

router.post("/remove", async (req, res) => {

});

module.exports = router;