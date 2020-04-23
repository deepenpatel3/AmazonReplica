import React, { Component } from "react";
import logo from '../../images/amazonimg.png';
import '../Home/home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h2>Welcome to</h2> 
                            <div className="img-div">
                                <img src={logo} alt="amazon"></img>
                            </div>
                                <div className="form-group">
                                    <h3> Continue as </h3>
                                    <Link to='/customerLogin'><h4><button className="btn btn-warning text-light">Customer</button></h4></Link>
                                    <Link to='/sellerLogin'><h4><button className="btn btn-warning text-light"> Seller</button></h4></Link>
                                    <Link to='/adminLogin'><h4><button className="btn btn-warning text-light"> Admin</button></h4></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
