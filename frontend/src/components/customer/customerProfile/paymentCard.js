import React, { Component } from "react";
import { connect } from "react-redux";
import Cards from 'react-credit-cards';
import '../customerProfile/customerProfile.css';
import 'react-credit-cards/es/styles-compiled.css';
import { Card, Form, Button, InputGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";

class PaymentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: [],
            testcard: [],
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
            },
            showeditcard: false,
            showaddcard: false,
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

    handleInputChangeDate = (e) => {
        this.setState({
            validThru:
                e.target.value.substring(0, 2) +
                "/" +
                e.target.value.substring(2, 4),
            valid: { status: true, message: "" }
        });
    }

    fetchprofiledbcall = () => {
        console.log("component did mount");
        if (this.props.loginStateStore.result !== null &&
            this.props.loginStateStore.result !== undefined) {
            var email = this.props.loginStateStore.result.email;
            console.log(email);
            const data = {
                email: email
            };
            Axios
                .post("http://localhost:3001/fetchProfile", data)
                .then(response => {
                    console.log(response.data);
                    console.log("Did mount response", response);
                    var output = response.data;
                    console.log("output", output.docs);

                    var card = [...output.docs.user.card];
                    this.setState({
                        card: card,
                        cardid: 0
                    });

                })
        }
    };

    componentDidMount() {
        this.fetchprofiledbcall();
    }

    editcard = card_id => {
        this.setState({
            cardid: card_id,
            showeditcard: true
        });
    };

    deletecard = card_id => {
        var card = [...this.state.card];
        var index1 = card_id;
        if (index1 > -1) {
            card.splice(index1, 1);
        }
        console.log(card);
        var email = this.props.loginStateStore.result.email;
        console.log("Emaild id is:", email);

        var data = {
            email: email,
            card: card
        };
        Axios
            .post("http://localhost:3001/updatecard", data)
            .then(response => {
                console.log("Response", response);
                if (response.status === 200) {
                    console.log("Inside delete card");
                    this.setState({ isCardUpdated: true });
                    this.fetchprofiledbcall();
                }
            });
    };


    addcard = () => {
        console.log("inside add card");
        this.setState({
            showaddcard: true
        });
    };

    addtocardarray = e => {
        e.preventDefault();
        const cvc = this.state.cvc;
        const name = this.state.name;
        const number = this.state.number;
        const validThru = this.state.validThru;
        const obj = {
            obj_cvc: cvc,
            obj_name: name,
            obj_number: number,
            obj_validThru: validThru,
        };
        const testcard = this.state.testcard.slice();
        testcard.push(obj);
        console.log("test the testcard", testcard);

        var email = this.props.loginStateStore.result.email;
        console.log("Emaild id is:", email);

        var data = {
            email: email,
            card: testcard
        };
        console.log("data is", data);
        //console.log("address is", this.state.address);
        Axios
            .post("http://localhost:3001/updatecard", data)
            .then(response => {
                console.log(response);
                console.log("card value", this.state.testcard);
                console.log("CHECKPOINT-CARD");
                this.fetchprofiledbcall();
            });
    };

    changecardfields = e => {
        console.log(
            "card 0",
            this.state.card[this.state.card].obj_cvc
        );
        console.log(e.target.id);
        console.log(e.target.value);
        const idvar = e.target.id;
        const val = e.target.value;

        if (e.target.id === "obj_cvc") {
            var card = [...this.state.card];
            const cardid = this.state.cardid;
            card[cardid].obj_cvc = e.target.value;
            console.log("card", card);
            this.setState({
                card: card
            });
            console.log(this.state.card);
        }

        if (e.target.id === "obj_name") {
            var card1 = [...this.state.card];
            const cardid = this.state.cardid;
            card1[cardid].obj_name = e.target.value;
            console.log("card", card1);
            this.setState({
                card: card1
            });
            console.log(this.state.card);
        }

        if (e.target.id === "obj_number") {
            var card2 = [...this.state.address];
            const cardid = this.state.addressid;
            card2[cardid].obj_number = e.target.value;
            console.log("card", card2);
            this.setState({
                card: card2
            });
            console.log(this.state.card);
        }

        if (e.target.id === "obj_validThru") {
            var card3 = [...this.state.card];
            const cardid = this.state.cardid;
            card3[cardid].obj_validThru = e.target.value;
            console.log("card", card3);
            this.setState({
                card: card3
            });
            console.log(this.state.card);
        }
    }

        canceleditcardchanges = e => {
            e.preventDefault();
            this.fetchprofiledbcall();
        };

        saveeditcardchanges = e => {
            e.preventDefault();
            console.log("edit card of the ", this.state.card);
            //var email = sessionStorage.getItem('key');
            var email = this.props.loginStateStore.result.email;
            console.log("Emaild id is:", email);

            var data = {
                email: email,
                card: this.state.card
            };
            console.log("card data is edited ", data);
            Axios
                .post("http://localhost:3001/updatecard", data)
                .then(response => {
                    console.log(response);
                    console.log("card val", this.state.card);
                    this.fetchprofiledbcall();
                });
        }

        handleChange = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        };

    render() {
        const { validUser } = this.state;
        const { validDate } = this.state;
        var savebutton = (
            <button
                type="submit"
                onSubmit={this.addcard}
                className="btn btn-warning text-light"
                data-target="#addcardid"
                style={{ width: "30%" }}>
                Add Payment
            </button>
        );
        if (this.state.showaddcard === true) {
            var addcardvar = (
                <div aria-labelledby="addcardid">
                    <div className="address1" id="cardid">
                        <Card.Title>
                            Add new Payment Card
                </Card.Title>
                        <form>

                            <input type="tel"
                                name="number"
                                placeholder="Card Number"
                                onChange={this.handleChange}
                                onFocus={this.handleInputFocus} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleChange}
                                onFocus={this.handleInputFocus} />
                            {!validUser.status ? (
                                <span style={{ color: "#ff0000" }}>{validUser.message}</span>
                            ) : null}

                            <input
                                type="DD MM"
                                name="date"
                                placeholder="Valid thru"
                                onChange={this.handleInputChangeDate}
                                onFocus={this.handleInputFocus} />
                            {!validDate.status ? (
                                <span style={{ color: "#ff0000" }}>{validDate.message}</span>
                            ) : null}

                            <input
                                type="number"
                                name="cvc"
                                placeholder="CVC"
                                onChange={this.handleChange}
                                onFocus={this.handleInputFocus} />

                            <center>
                                <button type="submit"
                                    onSubmit={this.addtocardarray}
                                    className="btn btn-warning text-light"
                                    style={{ width: "30%" }}>
                                    Save Payment
                    </button>
                                <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }}>Cancel</button>
                            </center>
                        </form>
                    </div>
                </div>
            );
        }

        var it1 = -1;
        const test2 = this.state.testcard;
        console.log("test2 is", test2);
        const card_var = test2.map((cardvalues, index) => {
            it1 = it1 + 1;
            var id1 = 0;
            return (
                <div classname="savedadd">
                    <Card.Header style={{ width: "100%" }}>
                        Your saved payment
                            </Card.Header>
                    <Form.Text className="text-muted">
                        <i>Update or delete your payment card(s).</i>

                        <center>

                            {cardvalues.obj_number}
                            {cardvalues.obj_name}
                            {cardvalues.obj_validThru}
                            {cardvalues.obj_cvc}

                            <button type="submit" value={it1} data-target="#basiccard" onSubmit={this.editcard(index)} className="btn btn-warning text-light" style={{ width: "30%" }}>Update Card</button>
                            <div className="spacing2" />
                            <button type="submit" onClick={this.handleSetdefault} className="btn btn-dark text-light" style={{ width: "30%" }}>Set default</button>
                            <div className="spacing2" />
                            <button type="submit" value={it1} onSubmit={this.deletecard(index)} className="btn btn-dark text-light" style={{ width: "30%" }}>Delete Card</button>

                        </center>

                    </Form.Text>
                </div>
            );
        });

        if (this.state.showeditcard === true && this.state.testcard.length > 0) {
            console.log("tesstcard is value", this.state.testcard);
            console.log("id for card val", this.state.cardid);
            console.log("card array", this.state.card);
            var cardedit = (
                <Card.Body>
                    <div aria-labelledby="cardid">
                        <div className="address1" id="basiccard">
                            <Card.Title>
                                <div id="addcardid">
                                    Add new card
                    </div>
                            </Card.Title>
                            <form>

                                <input type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                    value={
                                        this.state.card[this.state.cardid].obj_number
                                    }
                                    aria-describedby="basic-addon1"
                                    onChange={this.changecardfields}
                                    onFocus={this.handleInputFocus} />

                                <input type="text"
                                    name="number"
                                    placeholder="Card Name"
                                    value={
                                        this.state.card[this.state.cardid].obj_name
                                    }
                                    aria-describedby="basic-addon1"
                                    onChange={this.changecardfields}
                                    onFocus={this.handleInputFocus} />

                                <input type="DD MM"
                                    name="number"
                                    placeholder="Valid Thru"
                                    value={
                                        this.state.card[this.state.cardid].obj_validThru
                                    }
                                    aria-describedby="basic-addon1"
                                    onChange={this.changecardfields}
                                    onFocus={this.handleInputFocus} />

                                <input type="number"
                                    name="number"
                                    placeholder="CVC"
                                    value={
                                        this.state.card[this.state.cardid].obj_cvc
                                    }
                                    aria-describedby="basic-addon1"
                                    onChange={this.changecardfields}
                                    onFocus={this.handleInputFocus} />


                                <center>
                                    <button type="submit"
                                        onSubmit={this.saveeditcardchanges}
                                        className="btn btn-warning text-light"
                                        style={{ width: "30%" }}>
                                        Save card
                    </button>
                                    <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }} onSubmit={this.canceleditcardchanges}>Cancel</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </Card.Body>
            )
        }

        return (
            <div>
                <Card>
                    <Card.Header>
                        Manage your Credit/ Debit cards
                        </Card.Header>
                    <Form.Text className="text-muted">
                        <i> You can add upto 3 Credit/ Debit cards for security reasons.</i><br />
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
                            <br />

                        </div>
                    </Card.Body>
                    <div>{addcardvar}</div>
                    <div>{card_var}</div>
                    <div>{cardedit}</div>
                    <div>{savebutton}</div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginStateStore: state.card
});

export default connect(mapStateToProps, {})(PaymentCard);