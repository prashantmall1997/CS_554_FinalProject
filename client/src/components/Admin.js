import React, { useState } from "react";
import "../App.css";
import { Table, Button, Row, Col, Card } from "react-bootstrap";

export function Admin() {
    const [file, setFile] = useState("");
    const [userToDelete, setUserToDelete] = useState("");

    const deleteConfirmButton = (email) => {
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

    function handleUpload(event) {
        setFile(event.target.files[0]);
        // send to backend
    }

    const handleSignout = () => {
        // signout code
    };

    let username = "admin";

    // dummy user data
    const userList = [
        {
            email: "jperalta@stevens.edu",
            savedSchedules: 0
        },
        {
            email: "asantiago@stevens.edu",
            savedSchedules: 8
        },
        {
            email: "rholt@stevens.edu",
            savedSchedules: 5
        },
        {
            email: "rdiaz@stevens.edu",
            savedSchedules: 1
        },
        {
            email: "tjeffords@stevens.edu",
            savedSchedules: 3
        },
        {
            email: "cboyle@stevens.edu",
            savedSchedules: 4
        },
        {
            email: "glinetti@stevens.edu",
            savedSchedules: 0
        }
    ];

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
                    <h1>Upload Latest Schedules</h1>
                    <br />
                    <input type="file" accept=".csv" onChange={handleUpload} />
                </div>
                <br />
                <div>
                    <h1>Users</h1>
                    <div className="scroll-table">
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>User Email</th>
                                    <th>Saved Schedules</th>
                                    <th>Task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user) =>
                                    <tr>
                                        <td>{user.email}</td>
                                        <td>{user.savedSchedules}</td>
                                        <td>{deleteConfirmButton(user.email)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <br />
                <h1>Site Metrics</h1>
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
                                    21
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