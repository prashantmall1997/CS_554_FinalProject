import React,  { useEffect,useState} from 'react';
import { Button, Form, Row, Col, Card} from 'react-bootstrap';
//import userProfileImage from '../assets/images/userProfile.jpeg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { readUserByEmail, updateUser, readUserByUsername} from '../utils/api/apis/userApi.js';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions.js';
import { auth } from "./../config/firebase-config"

import { sendPasswordResetEmail } from "firebase/auth"
 
export function UserProfile() {
    //console.log("props " + props.match.params.username);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(undefined);
    const [error, setError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const userDetailsArray = useSelector((state) => state.login);
    console.log("Logged In User1 " + JSON.stringify(userDetailsArray[0]));
    let userDetails = userDetailsArray[0];
    let email = document.getElementById('email');
    // let password = document.getElementById('password');
    let cwid = document.getElementById('cwid');
    let username = document.getElementById('username');
    
    const disableFields = (event) => {
        event.preventDefault();
        setIsDisabled(!isDisabled);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        // console.log("new email " + email.value);
        // console.log("new password " + password.value);
        console.log("new username " + username.value);
        console.log("new cwid " + cwid.value);

        //input validation for username and cwid
        if (!username.value) {
            alert("You must provide username");
            username.focus();
            return;
        }

        if (!cwid.value) {
            alert("You must provide CWID");
            cwid.focus();
            return;
        }

        if (cwid.value.length !== 8) {
            alert("CWID must be of length 8");
            cwid.focus();
            return;
        }

        try {
                const updateStatus = await updateUser(username.value, email.value, cwid.value)
                console.log(updateStatus);
                if (typeof updateStatus == "boolean" && updateStatus === true) {
                    alert("User data updated successfully.")
                } else if (typeof updateStatus == "boolean" && updateStatus === false) { 
                    alert("There was no new data to be updated in database.");
                } else {
                        const checkUsernameExist = await readUserByUsername(username.value);
                        if (checkUsernameExist != null) { 
                            alert("username "+username.value + " already exists. Please use another username.");
                            username.focus();
                            return;
                        }
                        
                }  
                const userData = await readUserByEmail(email.value);
                //console.log(userData);
                if (userData === null || userData === undefined) {
                    setError(true);
                } else {
                    setUserData(userData);
                    username.value = userData.username;
                    cwid.value = userData.CWID;
                }
                setIsDisabled(!isDisabled);
            
        } catch (error) {
           alert("User data update did not occur. Please try again."+error);
        } 
    };

    const handleSignout = () => {

        dispatch(actions.logoutUser());
    };

    const forgotPassword = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, userDetails.email);
            alert("Please check your email to complete resetting your password.")
        } catch (error) {
        console.log(error.message);
        }
  };


    useEffect(() => {
        async function fetchData() {
            try { 
                const userData = await readUserByEmail(userDetails.email);
            
                if (userData ===  null || userData === undefined) {
                    setError(true);
                } else {
                    console.log(userData)
                    setUserData(userData);
                }
                setLoading(false);
            } catch (error) {   
                console.log(error);
            }
        }
        fetchData();
    },[userDetails.email]);

    if (loading) {
        return (
            <>
                <div className="navBar">
                    SIT Scheduler 2.0
                </div> 
                <div className="sidebar sidebar-button-active">
                    <a
                    href="/userProfile"
                    className="sidebar-button sidebar-button-active"
                    >
                    User Profile
                    </a>
                    <a
                    href="/createschedule"
                    className="sidebar-button"
                    >
                    Create Schedule
                    </a>
                    <a href="/schedules" className="sidebar-button">
                    Schedules
                    </a>
                    <div className="sidebar-button" onClick={() => handleSignout()}>
                    Sign out
                    </div>
                </div>
                <div className="main-content">
                    <div>
                        <h1>Loading...</h1>
                    </div>
                </div>
             </>  
        )
    } else if (error) {
        return (
            <>
                <div className="navBar">
                    SIT Scheduler 2.0
                </div>
                <div className="sidebar">
                    <a
                    href="/userProfile"
                    className="sidebar-button sidebar-button-active"
                    >
                    User Profile
                    </a>
                    <a
                    href="/createschedule"
                    className="sidebar-button"
                    >
                    Create Schedule
                    </a>
                    <a href="/schedules" className="sidebar-button">
                    Schedules
                    </a>
                    <div className="sidebar-button" onClick={() => handleSignout()}>
                    Sign out
                    </div>
                </div>
                <div className="main-content">
                    <div>
                        <h1>Loading...</h1>
                    </div>
                </div>
             </>  
        )
    } else {
        return (
            <> 
                <div className="navBar">
                    SIT Scheduler 2.0
                </div>
                {/* <Navbar className="navBar" expand="lg">
                    <Navbar.Brand href="/">SIT Schedular 2.0</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav.Item>
                            <Nav.Link className="navLink" href="/schedules">Schedules</Nav.Link>
                        </Nav.Item> 
                        <Nav.Item className="ms-auto">
                            <Nav.Link href="">Sign Out</Nav.Link>
                        </Nav.Item>
                
                    </Navbar.Collapse>
                </Navbar>
                <br></br>
                <br></br> */}

                <div className="sidebar">
                    <div className="sidebar-text">Welcome, {userData.username}</div>
                    <br />
                    <a
                    href="/userProfile"
                    className="sidebar-button sidebar-button-active"
                    >
                    User Profile
                    </a>
                    <a
                    href="/createschedule"
                    className="sidebar-button"
                    >
                    Create Schedule
                    </a>
                    <a href="/schedules" className="sidebar-button">
                    Schedules
                    </a>
                    <div className="sidebar-button" onClick={() => handleSignout()}>
                    Sign out
                    </div>
                </div>
                 <div className="main-content">
                <Card>
                    <Row>
                        {/* <Col lg={1} md={1} sm={1}>
                            <Card.Img className="profileImage" src={userProfileImage}>
                            </Card.Img>
                        </Col> */}
                        <Col lg={12} md={12} sm={12}>
                            <Card.Body>
                                <Card.Text>
                                    Username: {userData.username}
                                </Card.Text>

                                <Card.Text>
                                    Email ID: {userData.email}
                                </Card.Text>

                                <Card.Text>
                                    CWID: {userData.CWID}
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                
                <Card>
                    <br />
                    <Form id="user-form" name="user-form">
                        <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Email Id</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id="email" name="email" type="email" placeholder="Enter email" defaultValue={ userData.email} disabled= "true"/>
                            </Col>
                        </Row>
                         
                        <br/>
                        
                      
                        <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id ="username" type="text" placeholder="Enter username" defaultValue={userData.username} disabled={ isDisabled }/>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>CWID</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id="cwid" type="number" placeholder="Enter CWID" defaultValue={userData.CWID} disabled={ isDisabled }/>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id = "password" type="password" placeholder="Password" disabled={ isDisabled}/>
                            </Col>
                        </Row> */}
                        <br></br>
                        
                        {/* <Button variant="primary" onClick = {disableFields}>
                            Edit
                        </Button> */}
                        <button className="modal-button modal-confirm-button" onClick={(event) => { disableFields (event)}}>
                            Edit
                        </button>
                   
                        {/* <Button variant="primary" onClick = {handleUpdate}>
                            Update
                            </Button> */}
                            <button className="modal-button modal-confirm-button" onClick={(event) => { handleUpdate (event)}}>
                            Update
                        </button>
                   
                            
                        {/* <Button variant="primary" onClick = {forgotPassword}>
                            Reset Password
                            </Button> */}
                        <button className="modal-button modal-confirm-button" onClick={(event) => { forgotPassword (event)}}>
                          Reset Password
                        </button>
                    </Form>
                    </Card>
                    </div>
            </>
        )
    }
}

export default UserProfile
