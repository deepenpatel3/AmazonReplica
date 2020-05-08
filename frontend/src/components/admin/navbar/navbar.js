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
                        <Link class="navbar-brand" to="/">amazon</Link>
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/inventory">Inventory </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/sellers">Sellers</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/orders">Orders</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/dashboard">Dashboard<span class="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                      
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;


