import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Figure } from 'react-bootstrap';
import styled from 'styled-components';

// #252f3d
const Styles = styled.div`
.navbar{
    background-color: red;
}
`;


class Navbar extends Component {

    render() {
        if (!localStorage.getItem("id") || !(localStorage.getItem("type") == "seller")) {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <Styles>
                <div>
                    <nav class="navbar navbar-dark bg-dark  navbar-expand-lg " className="">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <Link class="navbar-brand" to="/seller/product">
                                <Figure.Image
                                    width={120}
                                    height={30}
                                    src="/amazon-navbar-logo.png"
                                />
                                {/* <Image src="/amazon-navbar-logo.png" ></Image> */}
                            </Link>
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <Link class="nav-link" to="/seller/product">Home <span class="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </div>
            </Styles>
        )
    }
}
export default Navbar;


