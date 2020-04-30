import React, { Component } from "react";
import '../customerProfile/customerProfile.css';
import {Card, Form, Button, InputGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";

class Address extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            address:{
                 line1:'',
                 line2:'',
                 city:'',
                 state:'',
                 country:'',
                 pincode:''
            },
            phonenumber:''
        }
        this.handlesaveAddress= this.handlesaveAddress.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
        this.handleUpdate= this.handleUpdate.bind(this);
        this.handleSetdefault= this.handleSetdefault.bind(this);
    }


    handlesaveAddress= async (e)=>{
        e.preventDefault();
    }

    handleDelete= async (e)=>{
        e.preventDefault();
    }

    handleUpdate= async(e)=>{
        e.preventDefault();
    }

    handleSetdefault= async(e)=>{
        e.preventDefault();
    }

    address(){ 
        if(this.state.address.length === 0){
            return <p>Add atleast one address to your account</p>
        }
    

    }
        render(){
            return(
                <div>
                    <Card>
                        <Card.Header>
                            Manage your addresses
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
                            <button type="submit" onSubmit={this.handlesaveAddress} className="btn btn-warning text-light" style={{ width: "30%" }}>Save address</button>

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
                        
                            <center>
                            <button type="submit" onSubmit={this.handleUpdate} className="btn btn-warning text-light" style={{ width: "30%" }}>Update address</button>

                            <button type="submit" onSubmit={this.handleDelete} className="btn btn-dark text-light" style={{ width: "30%" }}>Delete Address</button>

                            <InputGroup.Radio type="submit" onClick={this.handleSetdefault} className="btn btn-dark text-light" style={{ width: "30%" }}>Set default</InputGroup.Radio>
                            </center>
                            

                        </Form.Text>
                        <Card.Body>
                       
                        </Card.Body>
                        </div>

                        <Card.Header style={{ width: "100%" }}>
                            Your current delivery address
                        </Card.Header>
                        <Form.Text className="text-muted">
                            <i>This is your default delivery address.</i>
                        </Form.Text>

                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }

export default Address;
