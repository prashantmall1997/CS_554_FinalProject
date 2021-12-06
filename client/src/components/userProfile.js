import React from 'react';
import { Navbar, Nav,  Button, Modal, Form, Container, Row, Col, Card} from 'react-bootstrap';
import userProfileImage from '../assets/images/userProfile.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function userProfile() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" href="#home">
            <Navbar.Brand href="/homepage">SIT Schedular 2.0</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav.Item>
                    <Nav.Link href="/homepage">Schedules</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "ms-auto">
                    <Nav.Link href="">Sign Out</Nav.Link>
                </Nav.Item>
                
            </Navbar.Collapse>
            </Navbar>
            <br></br>
            <Card>
                <Row>
                    <Col lg={1} md={1 } sm={1}>
                        <Card.Img className="profileImage" src={ userProfileImage }>
                        </Card.Img>
                   </Col>
                    <Col lg={ 11 } md={ 11 }  sm={ 11 }>
                        <Card.Body>
                            <Card.Text>
                                Username:
                            </Card.Text>

                            <Card.Text>
                                Email ID:
                            </Card.Text>

                            <Card.Text>
                                CWID:
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row> 
            </Card>
            <br></br>
            <Card>
                {/* <Card.Text>
                    Update Details
                </Card.Text> */}
                {/* <Row>
                    <Col lg={ 1 } sm={ 1 } md={ 1 }>
                    </Col>

                </Row> */}
                <br/>
                <Form>
                    <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Email Id</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                 <Form.Control type="email" placeholder="Enter email" />
                            </Col>
                    </Row>
                    <br></br>
                    <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Col>
                    </Row>
                    <br></br>
                    <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                 <Form.Control type="password" placeholder="Password" />
                            </Col>
                    </Row>
                    <br></br>
                    <Row>
                            <Col lg={2} sm={2} md={2}>
                                <Form.Label>CWID</Form.Label>
                            </Col>
                            <Col lg={10} sm={10} md={10}>
                                <Form.Control type="number" placeholder="Enter CWID" />
                            </Col>
                    </Row>
                    <br></br>
                    
                    <Button className = "profileButtons" variant="primary" type="submit">
                        Edit
                    </Button>
                   
                    <Button className = "profileButtons" variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Card>
        </>
    )
}

export default userProfile