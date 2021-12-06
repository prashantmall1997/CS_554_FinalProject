const express = require("express");
const router = express.Router();
const ClassData = require("../data/controllers/classes");

router.get("/", async (req, res) => {
    try {
        //returns a list of class objects, or null if there are none
        let data = await ClassData.readAll();
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/create", async (req, res) => {
    try {
        //returns the class object if created
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let courseTime = body.courseTime;
        let courseLevel = body.courseLevel;
        let courseTotal = body.courseTotal;
        let coursePrefix = body.coursePrefix;
        let courseCode = body.courseCode;
        let courseSection = body.courseSection;
        let courseTitle = body.courseTitle;
        let sectionStatus = body.sectionStatus;
        let instructor = body.instructor;
        let sectionDetails = body.sectionDetails;
        let campus = body.campus;
        let format = body.format;
        let deliveryMode = body.deliveryMode;
        let enrolledCapacity = body.enrolledCapacity;
        if (!courseTime) throw new Error("must provide a courseTime");
        if (typeof courseTime != "string" || courseTime.replace(/\s/g, '') == "") throw new Error("courseTime must be a valid string");
        if (!courseLevel) throw new Error("must provide a courseLevel");
        if (typeof courseLevel != "string" || courseLevel.replace(/\s/g, '') == "") throw new Error("courseLevel must be a valid string");
        if (!courseTotal) throw new Error("must provide a courseTotal");
        if (typeof courseTotal != "string" || courseTotal.replace(/\s/g, '') == "") throw new Error("courseTotal must be a valid string");
        if (!coursePrefix) throw new Error("must provide a coursePrefix");
        if (typeof coursePrefix != "string" || coursePrefix.replace(/\s/g, '') == "") throw new Error("coursePrefix must be a valid string");
        if (!courseCode) throw new Error("must provide a courseCode");
        if (typeof courseCode != "string" || courseCode.replace(/\s/g, '') == "") throw new Error("courseCode must be a valid string");
        if (!courseSection) throw new Error("must provide a courseSection");
        if (typeof courseSection != "string" || courseSection.replace(/\s/g, '') == "") throw new Error("courseSection must be a valid string");
        if (!courseTitle) throw new Error("must provide a courseTitle");
        if (typeof courseTitle != "string" || courseTitle.replace(/\s/g, '') == "") throw new Error("courseTitle must be a valid string");
        if (!sectionStatus) throw new Error("must provide a sectionStatus");
        if (typeof sectionStatus != "string" || sectionStatus.replace(/\s/g, '') == "") throw new Error("sectionStatus must be a valid string");
        if (!instructor) throw new Error("must provide a instructor");
        if (typeof instructor != "string" || instructor.replace(/\s/g, '') == "") throw new Error("instructor must be a valid string");
        if (!sectionDetails) throw new Error("must provide a sectionDetails");
        if (typeof sectionDetails != "string" || sectionDetails.replace(/\s/g, '') == "") throw new Error("sectionDetails must be a valid string");
        if (!campus) throw new Error("must provide a campus");
        if (typeof campus != "string" || campus.replace(/\s/g, '') == "") throw new Error("campus must be a valid string");
        if (!format) throw new Error("must provide a format");
        if (typeof format != "string" || format.replace(/\s/g, '') == "") throw new Error("format must be a valid string");
        if (!deliveryMode) throw new Error("must provide a deliveryMode");
        if (typeof deliveryMode != "string" || deliveryMode.replace(/\s/g, '') == "") throw new Error("deliveryMode must be a valid string");
        if (!enrolledCapacity) throw new Error("must provide a enrolledCapacity");
        if (typeof enrolledCapacity != "string" || enrolledCapacity.replace(/\s/g, '') == "") throw new Error("enrolledCapacity must be a valid string");

        let data = await ClassData.create(
            courseTime,
            courseLevel,
            courseTotal,
            coursePrefix,
            courseCode,
            courseSection,
            courseTitle,
            sectionStatus,
            instructor,
            sectionDetails,
            campus,
            format,
            deliveryMode,
            enrolledCapacity,
        )
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readById", async (req, res) => {
    try {
        //Takes in a stringified ObjectId of a class called id
        //returns the class object if found, null if not
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        if (!id) throw new Error("must provide an id");
        if (typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");

        let data = await ClassData.readById(id);
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByCourseTime", async (req, res) => {
    try {
        //Takes in a courseTime string
        //returns an array of class objects, null if not found
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let courseTime = body.courseTime;
        if (!courseTime) throw new Error("must provide a courseTime");
        if (typeof courseTime != "string" || courseTime.replace(/\s/g, '') == "") throw new Error("courseTime must be a valid string");

        let data = await ClassData.readByCourseTime(courseTime);
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/readByCourseTotal", async (req, res) => {
    try {
        //Takes in a courseTotal string
        //returns an array of class objects, null if not found
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let courseTotal = body.courseTotal;
        if (!courseTotal) throw new Error("must provide a courseTotal");
        if (typeof courseTotal != "string" || courseTotal.replace(/\s/g, '') == "") throw new Error("courseTotal must be a valid string");

        let data = await ClassData.readByCourseTotal(courseTotal);
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/updateOrInsertByCourseTotal", async (req, res) => {
    try {
        //returns true if the class object is updated/created
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let courseTime = body.courseTime;
        let courseLevel = body.courseLevel;
        let courseTotal = body.courseTotal;
        let coursePrefix = body.coursePrefix;
        let courseCode = body.courseCode;
        let courseSection = body.courseSection;
        let courseTitle = body.courseTitle;
        let sectionStatus = body.sectionStatus;
        let instructor = body.instructor;
        let sectionDetails = body.sectionDetails;
        let campus = body.campus;
        let format = body.format;
        let deliveryMode = body.deliveryMode;
        let enrolledCapacity = body.enrolledCapacity;
        if (!courseTime) throw new Error("must provide a courseTime");
        if (typeof courseTime != "string" || courseTime.replace(/\s/g, '') == "") throw new Error("courseTime must be a valid string");
        if (!courseLevel) throw new Error("must provide a courseLevel");
        if (typeof courseLevel != "string" || courseLevel.replace(/\s/g, '') == "") throw new Error("courseLevel must be a valid string");
        if (!courseTotal) throw new Error("must provide a courseTotal");
        if (typeof courseTotal != "string" || courseTotal.replace(/\s/g, '') == "") throw new Error("courseTotal must be a valid string");
        if (!coursePrefix) throw new Error("must provide a coursePrefix");
        if (typeof coursePrefix != "string" || coursePrefix.replace(/\s/g, '') == "") throw new Error("coursePrefix must be a valid string");
        if (!courseCode) throw new Error("must provide a courseCode");
        if (typeof courseCode != "string" || courseCode.replace(/\s/g, '') == "") throw new Error("courseCode must be a valid string");
        if (!courseSection) throw new Error("must provide a courseSection");
        if (typeof courseSection != "string" || courseSection.replace(/\s/g, '') == "") throw new Error("courseSection must be a valid string");
        if (!courseTitle) throw new Error("must provide a courseTitle");
        if (typeof courseTitle != "string" || courseTitle.replace(/\s/g, '') == "") throw new Error("courseTitle must be a valid string");
        if (!sectionStatus) throw new Error("must provide a sectionStatus");
        if (typeof sectionStatus != "string" || sectionStatus.replace(/\s/g, '') == "") throw new Error("sectionStatus must be a valid string");
        if (!instructor) throw new Error("must provide a instructor");
        if (typeof instructor != "string" || instructor.replace(/\s/g, '') == "") throw new Error("instructor must be a valid string");
        if (!sectionDetails) throw new Error("must provide a sectionDetails");
        if (typeof sectionDetails != "string" || sectionDetails.replace(/\s/g, '') == "") throw new Error("sectionDetails must be a valid string");
        if (!campus) throw new Error("must provide a campus");
        if (typeof campus != "string" || campus.replace(/\s/g, '') == "") throw new Error("campus must be a valid string");
        if (!format) throw new Error("must provide a format");
        if (typeof format != "string" || format.replace(/\s/g, '') == "") throw new Error("format must be a valid string");
        if (!deliveryMode) throw new Error("must provide a deliveryMode");
        if (typeof deliveryMode != "string" || deliveryMode.replace(/\s/g, '') == "") throw new Error("deliveryMode must be a valid string");
        if (!enrolledCapacity) throw new Error("must provide a enrolledCapacity");
        if (typeof enrolledCapacity != "string" || enrolledCapacity.replace(/\s/g, '') == "") throw new Error("enrolledCapacity must be a valid string");

        let data = await ClassData.updateOrInsertByCourseTotal(
            courseTime,
            courseLevel,
            courseTotal,
            coursePrefix,
            courseCode,
            courseSection,
            courseTitle,
            sectionStatus,
            instructor,
            sectionDetails,
            campus,
            format,
            deliveryMode,
            enrolledCapacity,
        )
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.post("/removeById", async (req, res) => {
    try {
        //Takes in a stringified ObjectId of a class and removes it
        //returns true if removed, false if not
        let body = req.body;
        if (body.constructor === Object && Object.keys(body).length === 0) throw new Error("must provide a request body");
        let id = body.id;
        if (!id) throw new Error("must provide an id");
        if (typeof id != "string" || id.replace(/\s/g, '') == "") throw new Error("id must be a valid string");

        let data = await ClassData.removeById(id)
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

router.get("/removeAll", async (req, res) => {
    try {
        //returns true if the classe are removed, false if not

        let data = await ClassData.removeAll();
        res.json(data);
    }
    catch (err) {
        res.json({ error: `${err}` });
    }
});

module.exports = router;