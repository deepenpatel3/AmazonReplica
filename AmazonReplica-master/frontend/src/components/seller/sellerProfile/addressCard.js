import React, { Component } from "react";
import '../sellerProfile/sellerProfile.css';
import {Card, Form, Button, InputGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";

class Address extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
        render(){
            return(
                <div>
                    <Card>
                        <Card.Header>
                            Handle your dispatching addresses
                        </Card.Header>
                        <Form.Text className="text-muted">
                            <i>You can add multiple addresses.</i>
                        </Form.Text>
                        <Card.Body>
                        <div className="address1">
                            <Card.Title>
                                Address 1 
                            </Card.Title>
                            <Form>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Enter your full name"
                                aria-label="fullname"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Line 1</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Street name and no.,"
                                aria-label="Line1"
                                aria-describedby="basic-addon2"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">Line 2</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="House no.,"
                                aria-label="Line2"
                                aria-describedby="basic-addon3"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon4">City</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Enter your City"
                                aria-label="City"
                                aria-describedby="basic-addon4"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon5">State</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Enter your State"
                                aria-label="State"
                                aria-describedby="basic-addon6"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon7">Pincode</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder="Pincode"
                                aria-label="Pincode"
                                aria-describedby="basic-addon7"
                                />
                            </InputGroup>
                            <center>
                            <button type="submit" className="btn btn-warning text-light" style={{ width: "30%" }}>Save address</button>

                            <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }}>Cancel</button>
                            </center>
                            </Form>
                        </div>

                        <div classname="savedadd">
                        <Card.Header style={{ width: "100%" }}>
                            Your saved addresses
                        </Card.Header>
                        <Form.Text className="text-muted">
                            <i>Update or delete your address(es).</i>
                        </Form.Text>
                        </div>

                        <Card.Header style={{ width: "100%" }}>
                            Your current outsourcing address
                        </Card.Header>
                        <Form.Text className="text-muted">
                            <i>This is your default outsourcing address.</i>
                        </Form.Text>

                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }

export default Address;