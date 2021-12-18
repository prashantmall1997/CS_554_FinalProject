import React,  { useEffect,useState} from 'react';
import { Navbar, Nav, Button, Form, Row, Col, Card} from 'react-bootstrap';
import userProfileImage from '../assets/images/userProfile.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { readUserByEmail, updateUser } from '../utils/api/apis/userApi.js';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions.js';
 
function UserProfile(props) {
    //console.log("props " + props.match.params.username);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(undefined);
    const [error, setError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const dispatch = useDispatch();
    //const loggedInUser = useSelector((state) => state.login);
    
    
    //console.log("Logged In User1 " + JSON.stringify(loggedInUser));

    let userDetails = dispatch(
          actions.loginUser(
            false,
            "mrunalsalunke18",
            "mrunalsalunke18@gmail.com",
            "10467935"
          )
        );
    
    // consolelet userDetails = dispatch(actions.loginUser);
    console.log("UserDetails " + JSON.stringify(userDetails));

    let email = document.getElementById('email');
    // let password = document.getElementById('password');
    let cwid = document.getElementById('cwid');
    let username = document.getElementById('username');
    
    const disableFields = () => {
        setIsDisabled(!isDisabled)
    };

    const handleUpdate = async () => {
        // console.log("new email " + email.value);
        // console.log("new password " + password.value);
        console.log("new username " + username.value);
        console.log("new cwid " + cwid.value);
        try {
            const updateStatus = await updateUser(username.value, email.value, cwid.value)
            console.log(updateStatus);
             if (typeof updateStatus == "boolean" && updateStatus === true) {
                  alert("User data updated successfully.")
             } else {
                alert("User data update did not occur. Please try again.");
            }  
            const userData = await readUserByEmail(email.value);
            console.log(userData);

            if (userData === null || userData === undefined) {
                setError(true);
            } else {
                setUserData(userData);
                // username.value = userData.username;
                // cwid.value = userData.CWID;
            }
            disableFields();
        } catch (error) {
           alert("User data update did not occur. Please try again.");
        }
       
        
    };

    useEffect(() => {
        async function fetchData() {
            try { 
                const userData = await readUserByEmail(userDetails.payload.email);
            
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
    },[userDetails.payload.email]);

    if (loading) {
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
                <div>
                    <h1>Loading...</h1>
                </div>
            </>    
        )
    } else if (error) {
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
                <div>
                    <h1>User Not Found</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                
                <div className="navBar">
                    SIT Scheduler 2.0
                </div>
                <br></br>
                <br></br>
              
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
                    
                        <Button className="modal-button modal-confirm-button" variant="primary"  onClick = {disableFields}>
                            Edit
                        </Button>
                   
                        <Button className="modal-button modal-confirm-button" variant="primary" onClick = {handleUpdate}>
                            Update
                        </Button>
                    </Form>
                </Card>
            </>
        )
    }
}

export default UserProfile