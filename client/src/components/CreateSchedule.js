import React, { useState } from "react";
import "../App.css";
import { Table, Button, Row, Col, Card } from "react-bootstrap";

export function CreateSchedule() {
    
    const academicLevels = ["Certificate Programs", "Doctoral", "Graduate", "Non-Degree", "Undergraduate"];
    const courseLocations = ["WebCampus", "Hoboken - Main Campus"];
    const semesters = ["2022 Spring", "2022 Summer", "2022 Summer Session 1", "2022 Summer Session 2", "2022 Winter Intersession"];

    const courseForm = () => {
        return (
            <form>
                <Row xs={1} sm={2} md={3} lg={3} xl={3}>
                    <Col>
                        <Card className="p-3 schedule-form-card">
                            <Card.Title className="text-center">Semester</Card.Title>
                            {semesters.map((semester) =>
                                <div>
                                    <input 
                                        type="radio" 
                                        id={semester.replace(" ", "").toLowerCase} 
                                        name="semester"
                                        value={semester}
                                    />
                                    <label for="semester">{semester}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3 schedule-form-card">
                            <Card.Title className="text-center">Course Level</Card.Title>
                            {academicLevels.map((level) =>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={level.replace(" ", "").toLowerCase} 
                                        name={level.replace(" ", "").toLowerCase}
                                        value={level}
                                    />
                                    <label for={level.replace(" ", "").toLowerCase}>{level}</label>
                                    <br />
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3 schedule-form-card">
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
                </Row>
                <button>Search</button>
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