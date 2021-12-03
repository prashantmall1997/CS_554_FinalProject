import React, { useState } from "react";
import "../App.css";
import { Table, Button, Row, Col, Card } from "react-bootstrap";

export function CreateSchedule() {
    const [search, setSearch] = useState({
        courseName: "",
        semester: "",
        level: []
    });
    const [softRefresh, setSoftRefresh] = useState(false);
    
    const academicLevels = ["Certificate Programs", "Doctoral", "Graduate", "Non-Degree", "Undergraduate"];
    const courseLocations = ["WebCampus", "Hoboken - Main Campus"];
    const semesters = ["2022 Spring", "2022 Summer", "2022 Summer Session 1", "2022 Summer Session 2", "2022 Winter Intersession"];
    const subjects = ["Computer Science", "Mechanical Engineering", "Systems Engineering"];

    const courseData = [
        {
            subject: "Computer Science",
            number: 554,
            name: "Web Development II",
            level: "Graduate",
            semester: "2022 Spring"
        },
        {
            subject: "Computer Science",
            number: 546,
            name: "Web Development I",
            level: "Undergraduate",
            semester: "2022 Spring"
        },
        {
            subject: "Systems Engineering",
            number: 635,
            name: "Human Spaceflight",
            level: "Graduate",
            semester: "2022 Summer"
        }
    ]

    const handleTextSearch = (e) => {
        setSearch({
            courseName: e.target.value,
            semester: search.semester,
            level: search.level
        });
    };

    const handleSemesterSearch = (e) => {
        setSearch({
            courseName: search.courseName,
            semester: e.target.value,
            level: search.level
        });
    };

    const handleLevelSearch = (e) => {
        let arr = [...search.level, e.target.value];
        if (search.level.includes(e.target.value)) {
            arr = arr.filter(val => val !== e.target.value);
        }

        setSearch({
            courseName: search.courseName,
            semester: search.semester,
            level: arr
        });
    };

    let courses = courseData;
    let courseSearch = search.courseName.trim().toLowerCase();

    if (courseSearch.length > 0) {
      courses = courses.filter(val => val.name.toLowerCase().match(courseSearch));
    }
    
    courseSearch = search.semester.trim().toLowerCase();
    if (courseSearch.length > 0) {
        courses = courses.filter(val => val.semester.toLowerCase().match(courseSearch));
    }
    
    courseSearch = search.level;
    if (courseSearch.length > 0) {
        courses = courses.filter(val => courseSearch.includes(val.level));
    }

    const courseForm = () => {
        return (
            <form>
                <input 
                    onChange={(e) => handleTextSearch(e)} 
                    id="courseKeywords" 
                    name="courseKeywords" 
                />
                <Row xs={1} sm={2} md={3} lg={3} xl={3}>
                    <Col>
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
                                    <label for="semester">{semester}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col>
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
                                    <label for={level.toLowerCase}>{level}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3 mt-3 schedule-form-card">
                            <Card.Title className="text-center">Course Location</Card.Title>
                            {courseLocations.map((location) =>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={location.replace(" ", "").toLowerCase} 
                                        name={location.replace(" ", "").toLowerCase}
                                        value={location}
                                    />
                                    <label for={location.replace(" ", "").toLowerCase}>{location}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col>
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
                                    <label for={subject.replace(" ", "").toLowerCase}>{subject}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
                <br />
                <ul>
                    {courses.map(course => <li>{course.name}</li>)}
                </ul>
			</form>
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
                <div className="sidebar-button" onClick={handleSignout}>Sign out</div>
            </div>
            <div className="main-content">
                <div>
                    <h1>Create a Schedule</h1>
                    <br />
                    {courseForm()}
                </div>
            </div>
        </div>
    );
}

export default CreateSchedule;