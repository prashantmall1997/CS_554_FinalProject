import React, { useState } from "react";
import "../App.css";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import moment from "moment";

export function CreateSchedule() {
    const [activeSchedule, setActiveSchedule] = useState("");
    const [search, setSearch] = useState({
        name: "",
        semester: "",
        level: [],
        status: [],
        format: [],
        deliveryMode: []
    });

    // todo move this elsewhere?
    // function disciplineCodeMapping(fullName) {
    //     switch (fullName) {
    //         case "Accounting":
    //             return "ACC";
    //         case "Applied Artificial Intelligence":
    //             return "AAI";
    //         case "Biomedical Engineering":
    //             return "BME";
    //         case "Business and Technology":
    //             return "BT";
    //         case "Business Intelligence and Analytics":
    //             return "BIA";
    //         case "Civil Engineering":
    //             return "CE";
    //         case "Chemistry":
    //             return "CH";
    //         case "Chemical Engineering":
    //             return "CHE";
    //         case "Construction Management":
    //             return "CM";
    //         case "College of Arts and Letters":
    //             return "CAL";
    //         case "Professional Communications":
    //             return "COMM";
    //         case "Computer Engineering":
    //             return "CPE";
    //         case "Computer Science":
    //             return "CS";
    //         case "Dean's Office":
    //             return "DEAN";
    //         case "Mechanical Engineering":
    //             return "ME";
    //         case "Electrical Engineering":
    //             return "EE";
    //         case "Management":
    //             return "MGT";
    //         case "Financial Engineering":
    //             return "FE";
    //         case "Information Systems":
    //             return "MIS";
    //         case "Systems Engineering":
    //             return "SYS";
    //         case "Physics and Engineering Physics":
    //             return "PEP";
    //         case "Materials Engineering":
    //             return "MT";
    //         case "Ocean Engineering":
    //             return "OE";
    //         case "Environmental Engineering":
    //             return "EN";
    //         case "Finance":
    //             return "FIN";
    //         case "Mathematics":
    //             return "MA";
    //         case "Networked Information Systems":
    //             return "NIS";
    //         case "Executive Management of Technology":
    //             return "EMT";
    //         case "Software Engineering":
    //             return "SSW";
    //         case "Pharmaceutical Manufacturing":
    //             return "PME";
    //         case "Engineering Management":
    //             return "EM";
    //         case "Financial Analytics":
    //             return "FA";
    //         case "Sustainability Management":
    //             return "SM";
    //         case "English Language and Communication":
    //             return "ELC";
    //         case "Biology":
    //             return "BIO";
    //         case "Telecommunications Management":
    //             return "TM";
    //         case "Nanotechnology":
    //             return "NANO";
    //         case "Service Oriented Computing":
    //             return "SOC";
    //         case "Integrated Product Development":
    //             return "IPD";
    //         case "Provost":
    //             return "PRV";
    //         case "Enterprise Systems":
    //             return "ES";
    //         case "Bioengineering":
    //             return "BIOE";
    //     }
    // }
    
    const academicLevels = ["Certificate Programs", "Doctoral", "Graduate", "Non-Degree", "Undergraduate"];
    const semesters = ["2022 Spring", "2022 Summer", "2022 Summer Session 1", "2022 Summer Session 2", "2022 Winter Intersession"];
    //const subjects = ["Computer Science", "Mechanical Engineering", "Systems Engineering"];
    const subjects = ["CS", "ME", "SYS", "MA", "CH", "SOC", "FIN"];
    const formats = ["Lecture", "Thesis", "Laboratory", "Recitation", "Internship", "Seminar"];

    const courseData = [
        {
            coursePrefix: "CS",
            courseCode: 554,
            courseTitle: "Web Programming II",
            courseTotal: "CS 554-A - Web Programming II",
            courseLevel: "Graduate",
            courseTime: "2022 Spring",
            courseSection: "A",
            sectionDetails: "Monday | 3:00 PM - 5:30 PM",
            sectionStatus: "Open",
            instructor: "Patrick Hill",
            format: "Lecture",
            deliveryMode: "In-Person",
            enrolledCapacity: "32/50"
        },
        {
            coursePrefix: "CS",
            courseCode: 546,
            courseTitle: "Web Programming I",
            courseTotal: "CS 546-WS - Web Programming I",
            courseLevel: "Graduate",
            courseTime: "2022 Spring",
            courseSection: "WS",
            sectionDetails: "Web Campus |",
            sectionStatus: "Closed",
            instructor: "Patrick Hill",
            campus: "",
            format: "Lecture",
            deliveryMode: "Online",
            enrolledCapacity: "50/50"
        },
        {
            coursePrefix: "SYS",
            courseCode: 635,
            courseTitle: "Human Spaceflight",
            courseTotal: "SYS 635-WS - Human Spaceflight",
            courseLevel: "Graduate",
            courseTime: "2022 Summer",
            courseSection: "WS",
            sectionDetails: "Web Campus | Monday | 5:00 PM - 7:30 PM",
            sectionStatus: "Open",
            instructor: "Jerry Sellers",
            campus: "Web Campus",
            format: "Lecture",
            deliveryMode: "Online",
            enrolledCapacity: "26/40"
        }
    ];

    let schedules = [
        {
            name: "Schedule1",
            courses: [
                courseData[0]
            ]
        },
        {
            name: "Schedule2",
            courses: []
        }
    ];

    const handleTextSearch = (e) => {
        setSearch({
            name: e.target.value,
            semester: search.semester,
            level: search.level,
            status: search.status,
            format: search.format,
            deliveryMode: search.deliveryMode
        });
    };

    const handleSemesterSearch = (e) => {
        setSearch({
            name: search.name,
            semester: e.target.value,
            level: search.level,
            status: search.status,
            format: search.format,
            deliveryMode: search.deliveryMode
        });
    };

    const handleLevelSearch = (e) => {
        let arr = [...search.level, e.target.value];
        if (search.level.includes(e.target.value)) {
            arr = arr.filter(val => val !== e.target.value);
        }

        setSearch({
            name: search.name,
            semester: search.semester,
            level: arr,
            status: search.status,
            format: search.format,
            deliveryMode: search.deliveryMode
        });
    };

    const handleStatusSearch = (e) => {
        let arr = [...search.status, e.target.value];
        if (search.status.includes(e.target.value)) {
            arr = arr.filter(val => val !== e.target.value);
        }

        setSearch({
            name: search.name,
            semester: search.semester,
            level: search.level,
            status: arr,
            format: search.format,
            deliveryMode: search.deliveryMode
        });
    };

    const handleFormatSearch = (e) => {
        let arr = [...search.format, e.target.value];
        if (search.format.includes(e.target.value)) {
            arr = arr.filter(val => val !== e.target.value);
        }

        setSearch({
            name: search.name,
            semester: search.semester,
            level: search.level,
            status: search.status,
            format: arr,
            deliveryMode: search.deliveryMode
        });
    };

    const handleDeliveryModeSearch = (e) => {
        let arr = [...search.deliveryMode, e.target.value];
        if (search.deliveryMode.includes(e.target.value)) {
            arr = arr.filter(val => val !== e.target.value);
        }

        setSearch({
            name: search.name,
            semester: search.semester,
            level: search.level,
            status: search.status,
            format: search.format,
            deliveryMode: arr
        });
    };

    let courses = courseData;
    let courseSearch = search.name.trim().toLowerCase();

    if (courseSearch.length > 0) {
      courses = courses.filter(val => val.courseTitle.toLowerCase().includes(courseSearch));
    }
    
    courseSearch = search.semester.trim().toLowerCase();
    if (courseSearch.length > 0) {
        courses = courses.filter(val => val.courseTime.toLowerCase().match(courseSearch));
    }
    
    courseSearch = search.level;
    if (courseSearch.length > 0) {
        courses = courses.filter(val => courseSearch.includes(val.courseLevel));
    }
    
    courseSearch = search.status;
    if (courseSearch.length > 0) {
        courses = courses.filter(val => courseSearch.includes(val.sectionStatus));
    }
    
    courseSearch = search.format;
    if (courseSearch.length > 0) {
        courses = courses.filter(val => courseSearch.includes(val.format));
    }
    
    courseSearch = search.deliveryMode;
    if (courseSearch.length > 0) {
        courses = courses.filter(val => courseSearch.includes(val.deliveryMode));
    }

    // filter out classes already in the selected schedule
    for (let i in schedules) {
        if (schedules[i].name === activeSchedule) {
            courses = courses.filter(val => !schedules[i].courses.includes(val));
        }
    }

    const getTimes = (course) => {
        // initialize course time
        let times = {
            /*monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,*/
            days: [],
            start: moment("12:00 AM", "h:mm A"),
            end: moment("12:00 AM", "h:mm A")
        }

        /*if (course.sectionDetails.includes("Monday")) times.monday = true;
        if (course.sectionDetails.includes("Tuesday")) times.tuesday = true;
        if (course.sectionDetails.includes("Wednesday")) times.wednesday = true;
        if (course.sectionDetails.includes("Thursday")) times.thursday = true;
        if (course.sectionDetails.includes("Friday")) times.friday = true;
        if (course.sectionDetails.includes("Saturday")) times.saturday = true;
        if (course.sectionDetails.includes("Sunday")) times.sunday = true;*/
        if (course.sectionDetails.includes("Monday")) times.days.push("Monday");
        if (course.sectionDetails.includes("Tuesday")) times.days.push("Tuesday");
        if (course.sectionDetails.includes("Wednesday")) times.days.push("Wednesday");
        if (course.sectionDetails.includes("Thursday")) times.days.push("Thursday");
        if (course.sectionDetails.includes("Friday")) times.days.push("Friday");
        if (course.sectionDetails.includes("Saturday")) times.days.push("Saturday");
        if (course.sectionDetails.includes("Sunday")) times.days.push("Sunday");
        
        let timeRange = course.sectionDetails.substring(course.sectionDetails.lastIndexOf("|") + 1);
        times.start = moment(timeRange.split("-")[0], "h:mm A");
        times.end = moment(timeRange.split("-")[1], "h:mm A");

        return times;
    }

    const compareTimesWithActiveSchedule = (course) => {
        for (let i in schedules) {
            if (schedules[i].name === activeSchedule) {
                console.log("in if")
                for (let j in schedules[i].courses) {
                    let existingTimes = getTimes(schedules[i].courses[j]);
                    let courseTimes = getTimes(course)

                    let start1 = existingTimes.start.hour() + existingTimes.start.minute()/60;
                    let end1 = existingTimes.end.hour() + existingTimes.end.minute()/60;
                    let start2 = courseTimes.start.hour() + courseTimes.start.minute()/60;
                    let end2 = courseTimes.end.hour() + courseTimes.end.minute()/60;
       
                    const overlappingDays = courseTimes.days.filter(day => existingTimes.days.includes(day));

                    if (overlappingDays.length === 0) {
                        return "";
                    }

                    // todo need to check this logic to make sure it catches the right overlaps
                    if (start1 <= start2 && end1 > start2) {
                        return "result-conflict";
                    } else if (start1 < end2 && end1 > end2) {
                        return "result-conflict";
                    } else if (start2 <= start1 && end2 > start1) {
                        return "result-conflict";
                    } else if (start2 < end2 && end2 > end1) {
                        return "result-conflict";
                    } else { 
                        return "";
                    }
                }
            }
        }
        return "";
    }

    const scheduleSection = (scheduleName) => {
        if (activeSchedule === scheduleName) {
            return <Button variant="secondary" className="m-1" disabled>{scheduleName} (active)</Button>
        } else {
            return <Button variant="success" className="m-1" onClick={() => {setActiveSchedule(scheduleName)}}>Select {scheduleName}</Button>
        }
    }

    const showSchedule = () => {
        if (activeSchedule === "") {
            return;
        } else {
            for (let i of schedules) {
                if (i.name === activeSchedule) {
                    return (
                        <div>
                            <h2>Courses in {activeSchedule}</h2>
                            <Row xs={4}>
                                {i.courses.map(course => 
                                    <Col className="p-2 mt-2">
                                        <Card className="class-results-card">
                                            <Card.Title>{course.courseTotal}</Card.Title>
                                            <Card.Body>
                                            <p className="course-details"><span className="fw-bold">Section Details:</span> {course.sectionDetails}</p>
                                            <p className="course-details"><span className="fw-bold">Instructor:</span> {course.instructor}</p>
                                            <p className="course-details"><span className="fw-bold">Format:</span> {course.format}</p>
                                            <p className="course-details"><span className="fw-bold">Delivery Mode:</span> {course.deliveryMode}</p>
                                            <p className="course-details"><span className="fw-bold">Enrolled/Capacity:</span> {course.enrolledCapacity}</p>
                                            </Card.Body>
                                            <Card.Footer>
                                                <button 
                                                    className="add-remove-course" 
                                                    onClick={() => {removeClassFromSchedule(course)}}>
                                                    <img src='https://img.icons8.com/color/48/000000/minus.png' alt="remove from schedule" />
                                                    Remove
                                                </button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    );
                }
            }
            return;
        }
    }

    const addClassToSchedule = (courseInfo) => {
        for (let i in schedules) {
            if (schedules[i].name === activeSchedule) {
                schedules[i].courses.push(courseInfo);
            }
        }
    }

    const removeClassFromSchedule = (courseInfo) => {
        for (let i in schedules) {
            if (schedules[i].name === activeSchedule) {
                schedules[i].courses = schedules[i].courses.filter(e => e.courseTotal !== courseInfo.courseTotal);
            }
        }
    }

    const courseForm = () => {
        return (
                <Row>
                    <Col xs={12} md={3}>
            <form>
                        <h2>Search</h2>
                        <input 
                            onChange={(e) => handleTextSearch(e)} 
                            id="courseKeywords" 
                            name="courseKeywords" 
                            placeholder="Search class name..."
                        />
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Semester</Card.Title>
                            {semesters.map((semester) =>
                                <div>
                                    <input 
                                        type="radio" 
                                        id={semester.replace(" ", "").toLowerCase} 
                                        name="semester"
                                        value={semester}
                                        onChange={(e) => handleSemesterSearch(e)} 
                                    />
                                    <label htmlFor="semester">{semester}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Course Level</Card.Title>
                            {academicLevels.map((level) =>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={level.replace(" ", "").toLowerCase} 
                                        name={level.toLowerCase}
                                        value={level}
                                        onChange={(e) => handleLevelSearch(e)} 
                                    />
                                    <label htmlFor={level.toLowerCase}>{level}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Subjects</Card.Title>
                            {subjects.map((subject) =>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={subject.replace(" ", "").toLowerCase} 
                                        name={subject.replace(" ", "").toLowerCase}
                                        value={subject}
                                    />
                                    <label htmlFor={subject.replace(" ", "").toLowerCase}>{subject}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Status</Card.Title>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="open"
                                    name="open"
                                    value="Open"
                                    onChange={(e) => handleStatusSearch(e)} 
                                />
                                <label htmlFor="open">Open</label>
                                <br />
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="closed"
                                    name="closed"
                                    value="Closed"
                                    onChange={(e) => handleStatusSearch(e)} 
                                />
                                <label htmlFor="closed">Closed</label>
                                <br />
                            </div>
                        </Card>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Formats</Card.Title>
                            {formats.map((format) =>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={format.replace(" ", "").toLowerCase} 
                                        name={format.replace(" ", "").toLowerCase}
                                        value={format}
                                        onChange={(e) => handleFormatSearch(e)} 
                                    />
                                    <label htmlFor={format.replace(" ", "").toLowerCase}>{format}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Delivery Format</Card.Title>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="in-person"
                                    name="in-person"
                                    value="In-Person"
                                    onChange={(e) => handleDeliveryModeSearch(e)} 
                                />
                                <label htmlFor="in-person">In-Person</label>
                                <br />
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="online"
                                    name="online"
                                    value="Online"
                                    onChange={(e) => handleDeliveryModeSearch(e)} 
                                />
                                <label htmlFor="online">Online</label>
                                <br />
                            </div>
                        </Card>
			</form>
                    </Col>
            <Col xs={12} md={9}>
                <h2>Courses</h2>
                {courses.map(course => 
                    <Col className="p-2 mt-2">
                        <Card className={`class-results-card ${compareTimesWithActiveSchedule(course)}`}>
                            <Card.Title>{course.courseTotal}</Card.Title>
                            <Card.Body>
                            <Row xs={1} md={2}>
                                <Col><p className="course-details"><span className="fw-bold">Section Details:</span> {course.sectionDetails}</p></Col>
                                <Col><p className="course-details"><span className="fw-bold">Instructor:</span> {course.instructor}</p></Col>
                                <Col><p className="course-details"><span className="fw-bold">Format:</span> {course.format}</p></Col>
                                <Col><p className="course-details"><span className="fw-bold">Delivery Mode:</span> {course.deliveryMode}</p></Col>
                                <Col><p className="course-details"><span className="fw-bold">Enrolled/Capacity:</span> {course.enrolledCapacity}</p></Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <button 
                                    className="add-remove-course" 
                                    onClick={() => {addClassToSchedule(course)}}>
                                    <img src="https://img.icons8.com/color/48/000000/add--v1.png" alt="add to schedule" />
                                    Add to schedule
                                    <br />
                                    {compareTimesWithActiveSchedule(course) !== "" ? "Warning: This course section conflicts with one already in the selected schedule" : ""}
                                </button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Col>
            </Row>
        );
    }

    const handleSignout = () => {
        // todo signout code
    };

    // todo replace with username
    let username = "username";

    return (
        <div>
            <div className="topbar">
                SIT Scheduler 2.0
            </div>
            <div className="sidebar">
                <div className="sidebar-text">Welcome, {username}</div>
                <br />
                <a href="/admin" className="sidebar-button">Admin</a>
                <a href="/createschedule" className="sidebar-button sidebar-button-active">Create Schedule</a>
                <a href="/schedulespage" className="sidebar-button">Schedules</a>
                <div className="sidebar-button" onClick={handleSignout()}>Sign out</div>
            </div>
            <div className="main-content">
                <div>
                    <h1>Create a Schedule</h1>
                    <h2>Select Schedule</h2>
                    {schedules.map((schedule) =>
                        <div className="schedule-select">
                            {scheduleSection(schedule.name)}
                        </div>
                    )}
                    {showSchedule()}
                    <br />
                    {courseForm()}
                </div>
            </div>
        </div>
    );
}

export default CreateSchedule;