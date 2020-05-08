import React, { Component } from "react";
import { connect } from 'react-redux';
import { getOrders , cancelOrder} from '../../../Redux/actions/customer/cartActions';
import Stepper from 'react-stepper-horizontal';
import {Link} from 'react-router-dom';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.getStatus = this.getStatus.bind(this)
    }
    cancelOrder = (Order_id) => {
        this.props.cancelOrder({OrderID : Order_id})
    }
    getStatus = (status) => {
        if (status === "Accepted")
            return 0;
        else if (status === "Dispatched")
            return 1;
        else if (status === "Out for Delivery")
            return 2;
        else if (status === "Delivered")
            return 3;
    }
    componentDidMount() {
        this.props.getOrders({ CustomerID : localStorage.getItem("id") });
    }
    componentDidUpdate(prevProps){
        if(prevProps.orders !== this.props.orders){
            this.setState({
                orders : this.props.orders
            })
        }
    }
    
    render() {
        let orders = null;
        
        if (this.state.orders.length === 0) {
            orders = "No Orders Placed";
        } else {
            orders = this.state.orders.map((elem, i) => {
                return <div key={i} className="card card-body">
                    <div>
                        <h5><u>Order# : {elem.Order_id}</u></h5> <div style={{float : "right" , color : "red"}}>${Number.parseFloat(elem.Price * elem.Qty).toFixed(2)}</div>
                        <Link to={"/customer/productDetails/" + elem.ProductID} ><h6>{elem.productName}</h6></Link>
                        <h6>shipped from :: {elem.sellerName}</h6>
                        
                        <h6>Status : {elem.Tracking_Status}</h6>
                        <h6>Order Date : {elem.OrderDate}</h6><hr/>
                        <Stepper steps={ [{title: 'Accepted'}, {title: 'Dispatched'}, {title: 'Out for Delivery'}, {title: 'Delivered'}] } activeStep={ this.getStatus(elem.Tracking_Status) } />
                        <br/><br/>
                        <button className="btn btn-secondary float-right" style={{marginRight : "5%"}} type="button" data-toggle="collapse" data-target={"#collapseExample" + i} aria-expanded="false" aria-controls={"collapseExample" + i}>
                            View Details
                        </button>
                        <button className="btn btn-danger float-right" style={{marginRight : "5%"}} type="button" onClick={()=>this.cancelOrder(elem.Order_id)}>
                            Cancel Order
                        </button>
                    </div>
                    <div className="collapse" id={"collapseExample" + i} style={{marginTop : "5%"}}>
                        <div className="card card-body">
                            Billing Details : {elem.CardName} <br/>
                            Payment Details : {elem.CardNumber}   <br/>
                            Address : {elem.Address}
                        </div>
                    </div>
                </div>
            })
        }
            
        return <div className="container" style={{ marginTop: "2%" }}>
            {orders}
        </div>
    }

}
const map = state => {
    return {
        orders: state.cart.orders
    }
}
export default connect(map, { getOrders, cancelOrder })(Orders);