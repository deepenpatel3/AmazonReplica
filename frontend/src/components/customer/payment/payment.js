import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { getPaymentDetails } from "../../../Redux/actions/customer/payment"
import { connect } from 'react-redux'
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



    componentDidMount() {
        console.log("inside payment componentWillMount")
        let data = {
            id : localStorage.getItem("id")
        }

        this.props.getPaymentDetails(data)

    }

    componentWillReceiveProps(prevProps) {
        console.log("CustomerPayment : COMPONENETWILLRECEIVEPROPS CALLED")
        if (prevProps.savedAddress !== this.props.savedAddress || prevProps.payment !== this.props.payment || prevProps.cart !== this.props.cart) {
            
            let finalPrice = null
            prevProps.cart.forEach(element => {
                console.log("elem",element)
                finalPrice += element.Price * element.Quantity
            });

            console.log("final", finalPrice)
            this.setState({
                savedAddress: prevProps.savedAddress[0],
                paymentMethod: prevProps.payment[0],
                product: prevProps.cart,
                finalPrice: finalPrice
            })
        }
    }
    render() {
        console.log("Props:", this.props.savedAddress)
        let redirectVar = null 
        if (!localStorage.getItem("id")){
            redirectVar = <Redirect to ="/customerLogin"></Redirect>
        }
        var today = new Date();
        today.setDate(today.getDate() + 7);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row" style={{ marginTop: "2%" }} >
                        <div className="col-md-3 card" style={{ padding: "1%" }} ><b>1. Shipping Address</b></div>
                        <div className="col-md-6 card" style={{ padding: "1%" }}>
                            <div style={{ float: "left" }}>
                                <button style={{ float: "right", width: "20%", height: "30%" }}>Change</button>
                                {this.state.savedAddress.Street} {this.state.savedAddress.City}<br></br>
                                {this.state.savedAddress.State}  {this.state.savedAddress.Country}<br></br>
                                {this.state.savedAddress.Zipcode}<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-3 card" style={{ padding: "1%" }}><b>2. Payment Method</b></div>
                        <div className="col-md-6 card" style={{ padding: "1%" }}>
                            <div style={{ float: "left" }}>
                                <button style={{ float: "right", width: "20%", height: "30%" }}>Change</button>
                                <b>Visa</b> ending in : {this.state.paymentMethod.Number}<br></br>
                                <b>Billing Address : </b>{this.state.savedAddress.Street} {this.state.savedAddress.City} {this.state.savedAddress.State}<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-9 card" style={{ padding: "1%" }}><b>3. Review Item and Shipping</b><br></br>
                            <div className="card" style={{ padding: "1%" }}>
                                <h5 style={{ textDecoration: "green" }} className="text-success"> Guaranteed Delivery Date : {today}</h5>
                                <small>Items shipped from Amazon.com</small><br />
                                {this.state.product.map(elem => {
                                    return (
                                        <div>
                                            <div className="row" style={{ marginBottom: "10px" }}>
                                                <div className="col-md-2">
                                                    <img src={elem.ProductID.Images[0]} width="100px" height="100px" alt="Oops "></img>
                                                </div>
                                                <div className="col-md-7">
                                                    Shipped By : {elem.ProductID.Seller.Name}<br />
                                                    <b>{elem.ProductID.Name}</b><br />
                                                    {elem.ProductID.Description}<br />
                                                    Quantity : {elem.Quantity}<br />

                                                    <span className="text-danger">Bundle Total :  ${Number.parseFloat(elem.Price * elem.Quantity).toFixed(2)}</span>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-9 card" style={{ padding: "2%" }}>
                            <div className="row">
                                <div className="col-md-3">
                                    <button className="btn btn-warning">Place Your Order</button>
                                </div>
                                <div className="col-md-7">

                                    <b className="text-danger">Order Total : ${Number.parseFloat(this.state.finalPrice).toFixed(2)}</b><br />
                                    <small>By placing your order, you agree to Amazon.com's <span className="text-info">privacy notice</span> and <span className="text-info"> conditions of use</span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedAddress: state.customerPayment.savedAddress,
        payment: state.customerPayment.payment,
        cart: state.customerPayment.cart
    }
}
export default connect(mapStateToProps, { getPaymentDetails })(Payment);