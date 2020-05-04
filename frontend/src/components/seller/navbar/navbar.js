import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { getCart } from "../../../Redux/actions/customer/cartActions";
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Redirect} from 'react-router';
import { Navbar as BNavbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from "../../../Redux/actions/customer/loginAction";
import SearchIcon from '@material-ui/icons/Search';


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: []
        }
    }
    componentWillMount = () => {
        this.props.getCart({ id: localStorage.getItem("id") })
        this.logout =  this.logout.bind(this)
    }
    logout = () => {
        this.props.logout();
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cart: this.props.cart
            })
        }
    }
    render() {
        if(!localStorage.getItem("id") || !(localStorage.getItem("type") == "seller")){
            return(
            <Redirect to="/login" />
            );
        }
        return (
            <div>
                <BNavbar style={{ backgroundColor: "#252f3d", padding: "0" }}>
                    <BNavbar.Brand style={{ marginLeft: "1%" }} href="/customer/product"><img src="/navbar_logo.jpeg" width="150" height="55" alt="amazon" /></BNavbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" style={{ width: "900px" , borderRadius : "0px" }} className="mr-sm-7" />
                        <Button variant="warning" style = {{ mardinRight : "2%"}}><SearchIcon style={{paddingTop : "10%"}}/></Button>
                    </Form>
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link>
                            <PowerSettingsNewIcon style={{ color: "white" }} onClick ={this.logout}/>
                        </Nav.Link>
                    </Nav>
                </BNavbar>
                {/*                 
                <nav className="navbar navbar-dark bg-dark  navbar-expand-lg ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/customer/product">amazon</Link>
                        
                        <form className="ml-3 my-auto d-inline-block w-75">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav align-right">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/customer/cart">

                                    <StyledBadge badgeContent={this.state.cart.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </Link>
                            </li>

                        </ul>
                    </div> 
                </nav>*/}
            </div>
        )
    }
}
const map = state => {
    return {
        cart: state.cart.cart
    }
}
export default connect(map, { getCart, logout })(Navbar);


