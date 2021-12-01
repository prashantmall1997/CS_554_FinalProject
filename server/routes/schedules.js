const express = require("express");
const router = express.Router();
const ScheduleData = require("../data/controllers/schedules");

router.post("/create", async (req, res) => {
    try {
        //Takes in a name and time and creator, creates a schedule in the database
        //returns the created object if successful
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let name = body.name;
        let time = body.time;
        let creator = body.creator;
        if(!name) throw new Error("must provide a name");
        if(typeof name != "string" || name.replace(/\s/g, '') == "") throw new Error("name must be a valid string");
        if(!time) throw new Error("must provide an email");
        if(typeof time != "string" || time.replace(/\s/g, '') == "") throw new Error("time must be a valid string");
        if(!creator) throw new Error("must provide a creator");
        if(typeof creator != "string" || creator.replace(/\s/g, '') == "") throw new Error("creator  must be a valid string");
        
        let data = await ScheduleData.create(name, time, creator);
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/readById", async (req, res) => {
    try {
        //Takes in a stringified ObjectId called id of a schedule
        //returns the object if found, null if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");

        let data = await ScheduleData.readById(id);
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByUser", async (req, res) => {
    try {
        //Takes in a stringified ObjectId called id of a user
        //returns an array of schedules, or null if there are none
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");

        let data = await ScheduleData.readByUser(id);
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/addClass", async (req, res) => {
    try {
        //Takes in a stringified ObjectId called id of a user, and a stringified ObjectId called classId of a class
        //returns true if added, false if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        let classId = body.classId;
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");
        if(!classId) throw new Error("must provide a classId");
        if(typeof classId != "string" || classId.replace(/\s/g, '') == "") throw new Error("classId must be a valid string");

        let data = await ScheduleData.addClass(id, classId)
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/removeClass", async (req, res) => {
    try {
        //Takes in a stringified ObjectId called id of a user, and a stringified ObjectId called classId of a class
        //returns true if removed, false if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        let classId = body.classId;
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");
        if(!classId) throw new Error("must provide a classId");
        if(typeof classId != "string" || classId.replace(/\s/g, '') == "") throw new Error("classId must be a valid string");

        let data = await ScheduleData.removeClass(id, classId)
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/updateName", async (req, res) => {
    try {
        //Takes in a stringified ObjectId of a schedule called id and the name, updates the name of the schedule
        //returns true if updated, false if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let name = body.name;
        let id = body.id;
        if(!name) throw new Error("must provide a name");
        if(typeof name != "string" || name.replace(/\s/g, '') == "") throw new Error("name must be a valid string");
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");
                
        let data = await ScheduleData.updateName(id, name);
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

router.post("/remove", async (req, res) => {
    try {
        //Takes in a stringified ObjectId called id of a schedule
        //returns true if removed, false if not
        let body = req.body;
        if(body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        if(!id) throw new Error("must provide an id");
        if(typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");

        let data = await ScheduleData.remove(id);
        res.json(data);
    }
    catch(error) {
        res.json({ error: `${err}` });
    }
});

module.exports = router;