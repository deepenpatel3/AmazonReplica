import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-dark bg-dark  navbar-expand-lg ">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link class="navbar-brand" to="/customerProduct">Amazon</Link>
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/customerProduct">Home <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="#">Link</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link disabled" to="#">Disabled</Link>
                            </li>
                        </ul>
                        <form class="form-inline ">
                            <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/customer/cart"><i class="fas fa-shopping-cart"></i><span class="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;


