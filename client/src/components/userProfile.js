import React,  { useEffect,useState} from 'react';
import { Navbar, Nav, Button, Form, Row, Col, Card} from 'react-bootstrap';
import userProfileImage from '../assets/images/userProfile.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {readUserByUsername} from '../utils/api/apis/userApi.js';
 
function UserProfile(props) {
    console.log("props "+props.match.params.username);

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(undefined);
    const [error, setError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
   
    let email = document.getElementById('email');
    // let password = document.getElementById('password');
    let cwid = document.getElementById('cwid');
    let username = document.getElementById('username');
    
    const handleEdit = () => {
        setIsDisabled(!isDisabled)
    };

    const handleUpdate = () => {
        console.log("new email " + email.value);
        // console.log("new password " + password.value);
        console.log("new username " + username.value);

    };

    useEffect(() => {
        async function fetchData() {
            try { 
                let username = props.match.params.username;
                const userData = await readUserByUsername(username);

                if (userData ===  null || userData === undefined) {
                    setError(true);
                } else {
                    console.log(userData)
                    setUserData(userData);
                }
                console.log(userData);
                setLoading(false);
            } catch (error) {   
                console.log(error);
            }
        }
        fetchData();
    },[props.match.params.username]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    } else {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg" href="#home">
                    <Navbar.Brand href="/homepage">SIT Schedular 2.0</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        {/* <Nav.Item>
                            <Nav.Link href="/homepage">Schedules</Nav.Link>
                        </Nav.Item> */}
                        {/* <Nav.Item className="ms-auto">
                            <Nav.Link href="">Sign Out</Nav.Link>
                        </Nav.Item> */}
                
                    </Navbar.Collapse>
                </Navbar>
                <br></br>
                
                <Card>
                    <Row>
                        <Col lg={1} md={1} sm={1}>
                            <Card.Img className="profileImage" src={userProfileImage}>
                            </Card.Img>
                        </Col>
                        <Col lg={11} md={11} sm={11}>
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
                <br></br>
                <Card>
                    <br />
                    <Form id="user-form" name="user-form">
                         <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>CWID</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id="cwid" type="number" placeholder="Enter CWID" defaultValue={userData.CWID} disabled = "true"/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Email Id</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id="email" name="email" type="email" placeholder="Enter email" defaultValue={ userData.email} disabled={ isDisabled }/>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id ="username" type="text" placeholder="Enter username" defaultValue={userData.username} disabled={ isDisabled}/>
                            </Col>
                        </Row>
                        <br></br>
                        {/* <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control id = "password" type="password" placeholder="Password" disabled={ isDisabled}/>
                            </Col>
                        </Row> */}
                        <br></br>
                       
                        <br></br>
                    
                        <Button className="profileButtons" variant="primary"  onClick = {handleEdit}>
                            Edit
                        </Button>
                   
                        <Button className="profileButtons" variant="primary" onClick = {handleUpdate}>
                            Update
                        </Button>
                    </Form>
                </Card>
            </>
        )
    }
}

export default UserProfile