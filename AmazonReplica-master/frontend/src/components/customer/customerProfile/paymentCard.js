import React, { Component } from "react";
import Cards from 'react-credit-cards';
import '../customerProfile/customerProfile.css';
import 'react-credit-cards/es/styles-compiled.css';
import {Card, Form, Button, InputGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";

class PaymentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            validThru: "",
            validUser: {
                status: true,
                message: ""
            },
            validDate: {
                status: true,
                message: ""
      }
        }
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }
        

        handleInputFocus = (e) => {
            this.setState({ focus: e.target.name });
          }
          
        handleInputChange = (e) => {
            const { name, value } = e.target;
            this.setState({ [name]: value });
          }

        handleInputChangeDate=(e)=>{
            this.setState({
                validThru:
                  e.target.value.substring(0, 2) +
                  "/" +
                  e.target.value.substring(2, 4),
                valid: { status: true, message: "" }
              });
        }  
    
        render(){
            const { validUser } = this.state;
            const { validDate } = this.state;
            return(
                <div>
                    <Card>
                        <Card.Header>
                        Manage your Credit/ Debit cards
                        </Card.Header>
                        <Form.Text className="text-muted">
                           <i> You can add upto 3 Credit/ Debit cards for security reasons.</i><br/>
                           <i>Amazon never stores your Payment information.</i>
                        </Form.Text>

                        <Card.Body>
                        <Card.Title>
                            Add a payment method
                        </Card.Title>
                        <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <br/>
        <form>
        <center>
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange= {this.handleInputChange}
            onFocus= {this.handleInputFocus}/>

            <input
            type="text"
            name="name"
            placeholder="Name"
            onChange= {this.handleInputChange}
            onFocus= {this.handleInputFocus}/>
                 {!validUser.status ? (
            <span style={{ color: "#ff0000" }}>{validUser.message}</span>
          ) : null}
            <input
            type="DD MM"
            name="date"
            placeholder="Valid thru"
            onChange= {this.handleInputChangeDate}
            onFocus= {this.handleInputFocus}/>
            {!validDate.status ? (
            <span style={{ color: "#ff0000" }}>{validDate.message}</span>
          ) : null}

            <input
            type="number"
            name="cvc"
            placeholder="CVC"
            onChange= {this.handleInputChange}
            onFocus= {this.handleInputFocus}/>

          </center>
        </form>
        </div>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }


export default PaymentCard;