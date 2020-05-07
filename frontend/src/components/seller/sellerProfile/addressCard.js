import React, { Component } from "react";
import {connect} from "react-redux";
import '../sellerProfile/sellerProfile.css';
import {Card, Form, Button, InputGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CardBody } from "react-bootstrap/Card";
import Axios from "axios";

class Address extends Component{
    constructor(props) {
        super(props);
        this.state = {
            address: [],
            testaddress:[],
            addressid: 0,
            fullname:'',
            line1:'',
            line2:'',
            city:'',
            state:'',
            country:'',
            pincode:'',
            phonenumber:'',
            showeditaddress: false,
            showaddaddress: false,
    };
        }
        fetchprofiledbcall=()=>{
            console.log("component did mount");
            if(this.props.loginStateStore.result !== null &&
                this.props.loginStateStore.result !== undefined){
                    var email = this.props.loginStateStore.result.email;
                    console.log(email);
                    const data={
                        email: email
                    };
                    Axios
                    .post("http://localhost:3001/fetchProfile_seller",data)
                    .then(response=>{
                        console.log(response.data);
                        console.log("Did mount response",response);
                        var output=response.data;
                        console.log("output", output.docs);
    
                        var address=[...output.docs.user.address];
                        this.setState({
                            address:address,
                            addressid: 0
                        });
    
                    })
                }
        };
        componentDidMount() {
            this.fetchprofiledbcall();
          }
        
        editaddress=id1=>{
            this.setState({
                addressid: id1,
                showeditaddress: true
            });
        };
    
        deleteaddress=id1=>{
            var address=[...this.state.address];
            var index1=id1;
            if(index1>-1){
                address.splice(index1,1);
            }
            console.log(address);
            var email = this.props.loginStateStore.result.email;
            console.log("Emaild id is:", email);
    
            var data={
                email: email,
                address: address
            };
            Axios
            .post("http://localhost:3001/updateaddress_seller",data)
            .then(response => {
                console.log("Response", response);
                if (response.status === 200) {
                  console.log("Inside delete address");
                  this.setState({ isAddressUpdated: true });
                  this.fetchprofiledbcall();
                }
              });
          };
        
          addaddress=()=>{
            console.log("inside add address");
            this.setState({
                showaddaddress: true
            });
          };
          
          addtoaddressarray=e=>{
              e.preventDefault();
              const fullname= this.state.fullname;
              const line1 = this.state.line1;
              const line2 = this.state.line2;
              const city= this.state.city;
              const state= this.state.state;
              const country=this.state.country;
              const pincode= this.state.pincode;
              const phonenumber= this.state.phonenumber;
              const obj={
                  obj_fullname: fullname,
                  obj_line1: line1,
                  obj_line2: line2,
                  obj_city: city,
                  obj_state: state,
                  obj_country: country,
                  obj_pincode: pincode,
                  obj_phonenumber: phonenumber
              };
            const testaddress = this.state.testaddress.slice();
            testaddress.push(obj);
            console.log("test the testaddress", testaddress);
        
            var email = this.props.loginStateStore.result.email;
            console.log("Emaild id is:", email);
    
            var data = { 
                email: email, 
                address: testaddress 
            };
        console.log("data is", data);
        //console.log("address is", this.state.address);
        Axios
          .post("http://localhost:3001/updateaddress_seller", data)
          .then(response => {
            console.log(response);
            console.log("address value", this.state.testaddress);
            console.log("CHECKPOINT");
            this.fetchprofiledbcall();
          });
          };

          changeaddressfields=e=>{
            console.log(
                "address 0",
                this.state.address[this.state.address].obj_fullname
            );
            console.log(e.target.id);
            console.log(e.target.value);
            const idvar=e.target.id;
            const val=e.target.value;
            
            if (e.target.id === "obj_fullname") {
                var address = [...this.state.address];
                const addressid = this.state.addressid;
                address[addressid].obj_fullname = e.target.value;
                console.log("address", address);
                this.setState({ 
                    address: address 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_line1") {
                var address1 = [...this.state.address];
                const addressid = this.state.addressid;
                address1[addressid].obj_line1 = e.target.value;
                console.log("address", address1);
                this.setState({ 
                    address: address1 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_line2") {
                var address2 = [...this.state.address];
                const addressid = this.state.addressid;
                address2[addressid].obj_line2 = e.target.value;
                console.log("address", address2);
                this.setState({ 
                    address: address2 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_city") {
                var address3 = [...this.state.address];
                const addressid = this.state.addressid;
                address3[addressid].obj_city = e.target.value;
                console.log("address", address3);
                this.setState({ 
                    address: address3 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_state") {
                var address4 = [...this.state.address];
                const addressid = this.state.addressid;
                address4[addressid].obj_state = e.target.value;
                console.log("address", address4);
                this.setState({ 
                    address: address4 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_country") {
                var address5 = [...this.state.address];
                const addressid = this.state.addressid;
                address5[addressid].obj_country = e.target.value;
                console.log("address", address5);
                this.setState({ 
                    address: address5 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_pincode") {
                var address6 = [...this.state.address];
                const addressid = this.state.addressid;
                address6[addressid].obj_pincode = e.target.value;
                console.log("address", address6);
                this.setState({ 
                    address: address6 
                });
                console.log(this.state.address);
              }
    
              if (e.target.id === "obj_phonenumber") {
                var address7 = [...this.state.address];
                const addressid = this.state.addressid;
                address7[addressid].obj_phonenumber = e.target.value;
                console.log("address", address7);
                this.setState({ 
                    address: address7
                });
                console.log(this.state.address);
              }
        }  
    
        canceleditaddresschanges = e => {
            e.preventDefault();
            this.fetchprofiledbcall();
          };
    
        saveeditaddresschanges=e=>{
            e.preventDefault();
        console.log("edit address of the ", this.state.address);
        //var email = sessionStorage.getItem('key');
        var email = this.props.loginStateStore.result.email;
        console.log("Emaild id is:", email);
    
        var data = { 
            email: email, 
            address: this.state.address 
        };
    
        console.log("address data is edited ", data);
        Axios
          .post("http://localhost:3001/updateaddress_seller", data)
          .then(response => {
            console.log(response);
            console.log("address val", this.state.address);
            this.fetchprofiledbcall();
          });
        };
        
        
        handleChange(e){
            this.setState({
                [e.target.name]:e.target.value
            });
        };
    
        render(){
            var savebutton= ( 
                <button 
                    type="submit" 
                    onSubmit={this.addaddress} 
                    className="btn btn-warning text-light" 
                    data-target="#addaddressid"
                    style={{ width: "30%" }}>
                        Add dispatching address
                </button>
            );
            if(this.state.showaddaddress === true){
                var addaddressvar=(
            <div aria-labelledby="addadderessid">
            <div className="address1" id="addaddressid">
                <Card.Title>
                    Add new address
                </Card.Title>
                <Form>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" >Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Enter your full name"
                    aria-label="fullname"
                    aria-describedby="basic-addon1"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    />
                </InputGroup>
                
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon5">Country</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Country"
                    aria-label="Country"
                    aria-describedby="basic-addon6"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    />
                </InputGroup>
                <center>
                    <button type="submit" 
                        onSubmit={this.addtoaddressarray} 
                        className="btn btn-warning text-light"      
                        style={{ width: "30%" }}>
                                Save Dispatching address
                    </button>
                    <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }}>Cancel</button>
                </center>
                </Form>
            </div>
            </div>
                );
            }
            var it1=-1;
            const test2 = this.state.testaddress;
            console.log("test2 is", test2);
            const add_var = test2.map((addressvalues, index) => {
            it1 = it1 + 1;
            var id1 = 0;
            return(
                <div classname="savedadd">
                <Card.Header style={{ width: "100%" }}>
                    Your saved addresses
                </Card.Header>
                <Form.Text className="text-muted">
                    <i>Update or delete your address(es).</i>
                
                    <center>
                   
                    {addressvalues.obj_fullname}
                    {addressvalues.obj_line1}
                    {addressvalues.obj_line2}
                    {addressvalues.obj_city}
                    {addressvalues.obj_state}
                    {addressvalues.obj_country}
                    {addressvalues.obj_pincode}
                    {addressvalues.obj_phonenumber}

                    <button type="submit" value={it1} data-target="#basicaddress" onSubmit={this.editaddress(index)} className="btn btn-warning text-light" style={{ width: "30%" }}>Update address</button>
                    <div className="spacing2"/>
                    <button type="submit" onClick={this.handleSetdefault} className="btn btn-dark text-light" style={{ width: "30%" }}>Set default</button>
                    <div className="spacing2"/>
                    <button type="submit" value={it1} onSubmit={this.deleteaddress(index)} className="btn btn-dark text-light" style={{ width: "30%" }}>Delete Address</button>

                    </center>
                    
                </Form.Text>
                </div>
    );
});

if(this.state.showeditaddress === true && this.state.testaddress.length>0){
    console.log("tesstaddress is value", this.state.testaddress);
    console.log("id for address val", this.state.addressid);
    console.log("address array", this.state.address);
        var addressedit=(
            <Card.Body>
<div aria-labelledby="addadderessid">
<div className="address1" id="basicaddress">
    <Card.Title>
    <div id="addadderessid">
        Add new address
        </div>
    </Card.Title>
    <Form>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1" >Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Enter your full name"
        aria-label="fullname"
        value={
            this.state.address[this.state.addressid].obj_fullname
        }
        aria-describedby="basic-addon1"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon2">Line 1</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Street name and no.,"
        aria-label="Line1"
        value={
            this.state.address[this.state.addressid].obj_line1
        }
        aria-describedby="basic-addon2"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon3">Line 2</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="House no.,"
        aria-label="Line2"
        value={
            this.state.address[this.state.addressid].obj_line2
        }
        aria-describedby="basic-addon3"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon4">City</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Enter your City"
        aria-label="City"
        value={
            this.state.address[this.state.addressid].obj_city
        }
        aria-describedby="basic-addon4"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon5">State</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Enter your State"
        aria-label="State"
        value={
            this.state.address[this.state.addressid].obj_state
        }
        aria-describedby="basic-addon6"
        onChange={this.changeaddressfields}
        />
    </InputGroup>
    
    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon5">Country</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Country"
        aria-label="Country"
        value={
            this.state.address[this.state.addressid].obj_country
        }
        aria-describedby="basic-addon6"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon7">Pincode</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Pincode"
        aria-label="Pincode"
        value={
            this.state.address[this.state.addressid].obj_pincode
        }
        aria-describedby="basic-addon7"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon5">Phone Number</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        placeholder="Enter your Phone Number"
        aria-label="Phone number"
        value={
            this.state.address[this.state.addressid].obj_phonenumber
        }
        aria-describedby="basic-addon6"
        onChange={this.changeaddressfields}
        />
    </InputGroup>

    <center>
       <button type="submit" 
               onSubmit={this.saveeditaddresschanges} 
               className="btn btn-warning text-light"      
                style={{ width: "30%" }}>
                        Save address
        </button>
    <button type="submit" className="btn btn-dark text-light" style={{ width: "30%" }} onSubmit={this.canceleditaddresschanges}>Cancel</button>
    </center>
    </Form>
</div>
</div>
</Card.Body>
        )
}

return(
    <div>
        <Card>
        <Card.Body>
        <Card.Body>
            <Card.Header>
            Handle your dispatching addresses
            </Card.Header>
            <Form.Text className="text-muted">
                <i>You can add multiple addresses.</i>
            </Form.Text>

            <div className="address1">
                <div>
                    <center>
                        {savebutton}4
                    </center>
                </div>
                <Card.Body>                                
                        {addaddressvar}1
                </Card.Body>
            </div>
        </Card.Body>
                <div>{add_var}2</div>
            <Card.Body>
                <div>
                    {addressedit}3
                </div>
            </Card.Body>
            <Card.Header style={{ width: "100%" }}>
                Your current dispatching address
            </Card.Header>
            <Form.Text className="text-muted">
            <i>This is your default dispatching address.</i>
            </Form.Text>

            </Card.Body>
        </Card>
    </div>
)
}
}


const mapStateToProps = state => ({
    loginStateStore:state.address
});

export default connect(mapStateToProps,{})(Address);