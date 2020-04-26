import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar/navbar";

class Payment extends Component {
    //This is payment component
    constructor(props) {
        super(props)
        this.state = {
            paymentMethod: [],
            savedAddress: [],
            product: [],
            finalPrice: ""
        }
    }

    componentDidMount = () => {
        const savedAddress = {
            name: "Harshil",
            adress: [
                {
                    address1: "Milpitas",
                    address2: "San Jose",
                    state: "CA",
                    zip: "95035"
                },
                {
                    address1: "North San Jose",
                    adress2: "SF",
                    state: "CA",
                    zip: "95112"
                }
            ]
        }
        const paymentMethod = [
            {
                cardNumber: "01232456789",
                cardHolderName: "Harshil",
                cardExpirationDate: "10-12-2025",
                billingAddress: savedAddress.address
            },
            {
                cardNumber: "9876543210",
                cardHolderName: "Deepen",
                cardExpirationDate: "01-30-2024",
                billingAddress: savedAddress.address
            }
        ]
        const product = [
            {
                img: "http://lorempixel.com/640/480/city",
                productName: "PRODUCT NAME",
                productDescription: "PRODUCT DESCRIPTION",
                productPrice: 10.10,
                productQty: 3,
                sellerName: "SELLER NAME"
            },
            {
                img: "http://lorempixel.com/640/480/city",
                productName: "PRODUCT NAME",
                productDescription: "PRODUCT DESCRIPTION",
                productPrice: 12.00,
                productQty: 5,
                sellerName: "SELLER NAME"
            }
        ]
        let finalPrice = 0;
        for (let i of product) {
            finalPrice += i.productPrice * i.productQty
        }
        this.setState({
            product: product,
            savedAddress: savedAddress,
            paymentMethod: paymentMethod
        })
    }
    render() {
        // let redirectVar = null 
        // if (!localStorage.getItem("id")){
        //     redirectVar = <Redirect to ="/customerLogin"></Redirect>
        // }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-3">
                                        Shipping Address
                                    </div>
                                    <div className="col-md-5">
                                        Details Here
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md4">
                            <div className="card">
                                Place Your Order
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-3">
                                        Payment Info
                                    </div>
                                    <div className="col-md-5">
                                        Details Here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-3">
                                        Order Summary 
                                    </div>
                                    <div className="col-md-5">
                                        Details Here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Payment;