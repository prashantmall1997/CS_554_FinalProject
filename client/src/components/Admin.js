import "../App.css";
import FileReader from "./FileReader";
import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { readAllUsers, readAllClasses, removeUser, readUserByEmail } from "../utils/api";
import { deleteUserByEmailFirebase } from "./../utils/api/index";

import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import actions from '../actions.js';
const auth = getAuth();
require("dotenv").config();

const elasticsearch = require("elasticsearch");
const connectionString = process.env.SEARCH_URL;
const client = new elasticsearch.Client({
    host: connectionString,
    maxRetries: 5,
    requestTimeout: 300000,
    deadTimeout: 300000,
    keepAlive: true
});

export function Admin() {
   const dispatch = useDispatch();
  const [userToDelete, setUserToDelete] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [classesIndexed, setClassesIndexed] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login[0]);

  useEffect(() => {
    readAllUsers().then((users) => {
      setAllUsers(users);
    });
  }, [userToDelete]);

  useEffect(() => {
    readAllClasses().then((classes) => {
      setAllClasses(classes);
    });
  }, []);


  const deleteAppUser = async (email) => {
    const userDetails = await readUserByEmail(email);

    removeUser(userDetails.username).then(async () => {
      setUserToDelete("");
      const userToDeleteFirebase = await deleteUserByEmailFirebase(email);
      console.log(userToDeleteFirebase);	
    });	
  };

  const deleteConfirmButton = (email, isAdmin) => {
    if (isAdmin === true) {
      return "Admin cannot be deleted";
    }

    if (email !== userToDelete) {
      return (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setUserToDelete(email);
          }}
        >
          Delete User
        </Button>
      );
    } else {
      return (
        <div>
          <Button
            variant="danger"
            size="sm"
            className="m-1"
            onClick={() => {
              deleteAppUser(email);
            }}
          >
            Confirm Delete
          </Button>
          <br />
          <Button
            variant="secondary"
            size="sm"
            className="m-1"
            onClick={() => {
              setUserToDelete("");
            }}
          >
            Cancel
          </Button>
        </div>
      );
    }
  };

  const handleSignout = async () => {
    dispatch(actions.logoutUser());
    await auth.signOut();

  let totalSavedSchedules = 0;
  for (let user of allUsers) {
    totalSavedSchedules += user.schedules.length;
  }

  let numberOfClasses = 0;
  if (allClasses !== undefined) {
    numberOfClasses = allClasses.length;
  }

  let numberOfUsers = 0;
  if (allUsers !== undefined) {
    numberOfUsers = allUsers.length;
  }

  const addDocumentToIndex = async(i, info) => {
    await client.index({
      index: "classes",
      type: "document",
      id: `${i}`,
      body: {
        id: `${info._id}`,
        courseTime: `${info.courseTime}`,
        courseLevel: `${info.courseLevel}`,
        courseTotal: `${info.courseTotal}`,
        coursePrefix: `${info.coursePrefix}`,
        courseTitle: `${info.courseTitle}`,
        sectionStatus: `${info.sectionStatus}`,
        instructor: `${info.instructor}`,
        sectionDetails: `${info.sectionDetails}`,
        campus: `${info.campus}`,
        format: `${info.format}`,
        deliveryMode: `${info.deliveryMode}`,
        enrolledCapacity: `${info.enrolledCapacity}`
      }
    }).then(() => {
      setClassesIndexed(i);
    });
  }

  const updateIndex = async() => {
    let i = 0;
    for (let cl of allClasses) {
      i++;
      await addDocumentToIndex(i, cl);
    }
    setClassesIndexed(i);
  }

  return (
    <div>
      <div className="topbar">SIT Scheduler 2.0</div>
      <div className="sidebar">
        <div className="sidebar-text">Welcome, {user.username}</div>
        <br />
        <a href="/admin" className="sidebar-button sidebar-button-active">
          Admin
        </a>
        <a href="/userprofile" className="sidebar-button">
          User Profile
        </a>
        <a href="/createschedule" className="sidebar-button">
          Create Schedule
        </a>
        <a href="/schedules" className="sidebar-button">
          Schedules
        </a>
        <div className="sidebar-button" onClick={handleSignout}>
          Sign out
        </div>
      </div>
      <div className="main-content">
        <div>
          <h1>Administration</h1>
          <h2>Upload Latest Schedules</h2>
          <br />
          <FileReader />
          <br />
          <Button onClick={() => {
            updateIndex();
          }}>
            Update Search Index
          </Button>
          <br />
          {classesIndexed <= 0 ? "" : `${classesIndexed}/${allClasses.length} classes indexed.`}
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
                {allUsers.map((user) => (
                  <tr key={user.email}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.CWID}</td>
                    <td>{user.schedules.length}</td>
                    <td>{deleteConfirmButton(user.email, user.admin)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <br />
        <h2>Site Metrics</h2>
        <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4">
          <Col>
            <Card className="p-2">
              <Card.Img
                className="transparent-img"
                variant="top"
                src="/assets/book.png"
                alt="number of courses"
              />
              <Card.Body>
                <Card.Title className="text-center">
                  AVAILABLE COURSES
                </Card.Title>
                <Card.Text>{numberOfClasses}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="p-2">
              <Card.Img
                className="transparent-img"
                variant="top"
                src="/assets/calendar.png"
                alt="schedules saved"
              />
              <Card.Body>
                <Card.Title className="text-center">SCHEDULES SAVED</Card.Title>
                <Card.Text>{totalSavedSchedules}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="p-2">
              <Card.Img
                className="transparent-img"
                variant="top"
                src="/assets/view.png"
                alt="number of users"
              />
              <Card.Body>
                <Card.Title className="text-center">TOTAL USERS</Card.Title>
                <Card.Text>{numberOfUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Admin;
