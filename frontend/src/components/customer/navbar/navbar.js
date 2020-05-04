import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getCart } from "../../../Redux/actions/customer/cartActions";
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Redirect} from 'react-router';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: []
        }
    }
    componentWillMount = () => {
        this.props.getCart({ id: localStorage.getItem("id") })
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cart: this.props.cart
            })
        }
    }
    render() {
        if(!localStorage.getItem("id") || !(localStorage.getItem("type") == "customer")){
            return(
            <Redirect to="/login" />
            );
        }
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark  navbar-expand-lg ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/customer/products">amazon</Link>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/customer/products">Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <form className="form-inline ">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/customer/cart">

                                    <StyledBadge badgeContent={this.state.cart.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
const map = state => {
    return {
        cart: state.cart.cart
    }
}
export default connect(map, { getCart })(Navbar);


