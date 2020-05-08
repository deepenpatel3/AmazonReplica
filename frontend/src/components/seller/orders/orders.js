import React, { Component } from "react";
import { connect } from 'react-redux';
import { getSellerOrders , changeStatus } from '../../../Redux/actions/seller/productAction';
import Stepper from 'react-stepper-horizontal';
import {Link} from 'react-router-dom';
//admin/orders/changeStatus => post ; body => status , Order_id
class SellerOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.getStatus = this.getStatus.bind(this)
    }
    changeStatus = (Order_id , e) => {
        let data = {
            Order_id : Order_id , 
            status : e.target.value
        }
        this.props.changeStatus(data)
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
        this.props.getSellerOrders({ SellerID : localStorage.getItem("id") });
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
                        
                        
                        <h6>Status : {elem.Tracking_Status}</h6>
                        <h6>Order Date : {elem.OrderDate}</h6>
                        <hr/>
                        
                        <Stepper steps={ [{title: 'Accepted'}, {title: 'Dispatched'}, {title: 'Out for Delivery'}, {title: 'Delivered'}] } activeStep={ this.getStatus(elem.Tracking_Status) } />
                        <br />
                        <br />
                        <div className="form-group" style={{float : "right" , marginRight : "5%"}}>
                            <select onChange ={(e) => this.changeStatus(elem.Order_id , e)} className="form-control">
                                <option value = "">Change Status</option> 
                                <option value = "Accepted">Accepted</option> 
                                <option value = "Dispatched">Dispatched</option>
                                <option value = "Out for Delivery">Out for Delivery</option>
                                <option value = "Delivered">Delivered</option>
                                <option value = "Cancel">Cancel Order</option>
                            </select>
                        </div>
                        <button className="btn btn-secondary float-right" style={{marginRight : "5%"}} type="button" data-toggle="collapse" data-target={"#collapseExample" + i} aria-expanded="false" aria-controls={"collapseExample" + i}>
                            View Details
                        </button>
                        
                    </div>
                    <div className="collapse" id={"collapseExample" + i} style={{marginTop : "5%"}}>
                        <div className="card card-body">
                            Billing Details : {elem.CardName} <br/><br/>
                            Payment Details : {elem.CardNumber}   <br/><br/>
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
        orders: state.sellerProductData.orders
    }
}
export default connect(map, { getSellerOrders, changeStatus })(SellerOrders);