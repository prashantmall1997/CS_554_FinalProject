const express = require("express");
const router = express.Router();
const UserData = require("../data/controllers/user");

router.get("/", async (req, res) => {
    //returns a list of user objects, or null if there are none
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
        //Takes in a username and email, creates a user in the database
        //returns the created object if successful
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let username = body.username;
        let email = body.email;
        let CWID = body.CWID;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");
        if(!email) throw new Error("must provide an email");
        if(typeof email != "string" || email.replace(/\s/g, '') == "") throw new Error("email must be a valid string");
        if(!CWID) throw new Error("must provide a CWID");
        if(typeof CWID != "string" || CWID.replace(/\s/g, '') == "") throw new Error("CWID must be a valid string");
        
        let data = await UserData.create(username, email, CWID);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByUsername", async (req, res) => {
    try {
        //Takes in a username, finds the user object
        //returns the found object or null if not found
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let username = body.username;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");
        
        let data = await UserData.readByUsername(username);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByEmail", async (req, res) => {
    try {
        //Takes in an email, finds the user object
        //returns the found object, null if not found
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let email = body.email;
        if(!email) throw new Error("must provide an email");
        if(typeof email != "string" || email.replace(/\s/g, '') == "") throw new Error("email must be a valid string");
        
        let data = await UserData.readByEmail(email);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/addSchedule", async (req, res) => {
    try {
        //Takes in a username and scheduleId, adds the scheduleId to the list of schedules of the user
        //returns true if the scheduleId was added, false if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let username = body.username;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");
        let scheduleId = body.scheduleId;
        if(!scheduleId) throw new Error("must provide a scheduleId");
        if(typeof scheduleId != "string" || scheduleId.replace(/\s/g, '') == "") throw new Error("scheduleId must be a valid string");
        
        let data = await UserData.addSchedule(username, scheduleId);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/removeSchedule", async (req, res) => {
    try {
        //Takes in a username and scheduleId, removes the scheduleId from the list of schedules of the user
        //returns true if the scheduleId was removed, false if not found
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let username = body.username;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");
        let scheduleId = body.scheduleId;
        if(!scheduleId) throw new Error("must provide a scheduleId");
        if(typeof scheduleId != "string" || scheduleId.replace(/\s/g, '') == "") throw new Error("scheduleId must be a valid string");
        
        let data = await UserData.removeSchedule(username, scheduleId);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

router.post("/remove", async (req, res) => {
    try {
        //Takes in a username, removes the user
        //returns true if the user was removed, false if not found
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let username = body.username;
        if(!username) throw new Error("must provide a username");
        if(typeof username != "string" || username.replace(/\s/g, '') == "") throw new Error("username must be a valid string");

        let data = await UserData.remove(username);
        res.json(data);
    }
    catch(err) {
        res.json({ error: `${err}` });
    }
});

module.exports = router;