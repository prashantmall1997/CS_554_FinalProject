import React, { useState } from "react";
import "../App.css";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import FileReader from "./FileReader";

export function Admin() {
    const [userToDelete, setUserToDelete] = useState("");

    const deleteConfirmButton = (email, isAdmin) => {
        if (isAdmin === true) {
            return "Admin cannot be deleted";
        }

        if (email !== userToDelete) {
            return (
                <Button variant="danger" size="sm" onClick={() => {setUserToDelete(email)}}>Delete User</Button>
            );
        } else {
            return (
                <div>
                    <Button variant="danger" size="sm" className="m-1" onClick={() => {deleteUser(email)}}>Confirm Delete</Button>
                    <br />
                    <Button variant="secondary" size="sm" className="m-1" onClick={() => {setUserToDelete("")}}>Cancel</Button>
                </div>
            );
        }
    }

    const deleteUser = (email) => {
        // todo add delete user code
        setUserToDelete("");
    }

    const handleSignout = () => {
        // signout code
    };

    let username = "admin";

    // dummy user data
    const userList = [
        {
            username: "jperalta",
            email: "jperalta@stevens.edu",
            schedules: [],
            CWID: "04200420",
            admin: false
        },
        {
            username: "asantiago",
            email: "asantiago@stevens.edu",
            schedules: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"],
            CWID: "12345678",
            admin: true
        },
        {
            username: "rholt",
            email: "rholt@stevens.edu",
            schedules: ["s1", "s2", "s3", "s4", "s5"],
            CWID: "11111111",
            admin: false
        },
        {
            username: "rdiaz",
            email: "rdiaz@stevens.edu",
            schedules: ["s1"],
            CWID: "00000000",
            admin: false
        },
        {
            username: "tjeffords",
            email: "tjeffords@stevens.edu",
            schedules: ["s1", "s2", "s3"],
            CWID: "99999999",
            admin: false
        },
        {
            username: "cboyle",
            email: "cboyle@stevens.edu",
            schedules: ["s1", "s2", "s3", "s4"],
            CWID: "10000000",
            admin: false
        },
        {
            username: "glinetti",
            email: "glinetti@stevens.edu",
            schedules: [],
            CWID: "77777777",
            admin: false
        }
    ];

    let totalSavedSchedules = 0;
    for (let user of userList) {
        totalSavedSchedules += user.schedules.length;
    }

    return (
        <div>
            <div className="topbar">
                SIT Scheduler 2.0
            </div>
            <div className="sidebar">
                <div className="sidebar-text">Welcome, {username}</div>
                <br />
                <a href="/admin" className="sidebar-button sidebar-button-active">Admin</a>
                <a href="/schedulespage" className="sidebar-button">Scheduler</a>
                <div className="sidebar-button" onClick={handleSignout}>Sign out</div>
            </div>
            <div className="main-content">
                <div>
                    <h1>Administration</h1>
                    <h2>Upload Latest Schedules</h2>
                    <br />
                    <FileReader />
                </div>
                <br />
                <div>
                    <h2>Users</h2>
                    <div className="scroll-table">
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>CWID</th>
                                    <th>Saved Schedules</th>
                                    <th>Task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user) =>
                                    <tr>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.CWID}</td>
                                        <td>{user.schedules.length}</td>
                                        <td>{deleteConfirmButton(user.email, user.admin)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <br />
                <h2>Site Metrics</h2>
                <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4">
                    <Col>
                        <Card className="p-2">
                            <Card.Img className="transparent-img" variant="top" src="/assets/book.png" alt="number of courses" />
                            <Card.Body>
                                <Card.Title className="text-center">AVAILABLE COURSES</Card.Title>
                                <Card.Text>
                                    1234
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-2">
                            <Card.Img className="transparent-img" variant="top" src="/assets/calendar.png" alt="schedules saved" />
                            <Card.Body>
                                <Card.Title className="text-center">SCHEDULES SAVED</Card.Title>
                                <Card.Text>
                                    {totalSavedSchedules}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-2">
                            <Card.Img className="transparent-img" variant="top" src="/assets/view.png" alt="site views" />
                            <Card.Body>
                                <Card.Title className="text-center">SITE VIEWS</Card.Title>
                                <Card.Text>
                                    201
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Admin;