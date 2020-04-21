import React, { Component } from "react";
import logo from "../../../images/amazon.png"

class Adminlogin extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{ marginTop: "10%" }} >

                        <form style={{ marginLeft: "30%", marginRight: "30%" }}>
                            <div  className="text-center" >
                            <img src={logo} alt="oops" style={{width : "50%"}}/>
                            </div>
                            <h2>Sign In</h2>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div class="form-group" style={{ width: "100%" }}>
                                <button type="submit" class="btn btn-warning text-light" style={{ width: "100%" }}>Submit</button>
                            </div>
                            <small id="emailHelp" class="form-text text-muted">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</small>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Adminlogin;