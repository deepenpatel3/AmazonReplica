import React, { Component } from "react";
import { connect } from 'react-redux';
import { getOrders } from '../../../Redux/actions/customer/cartActions';
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentWillMount() {
        this.props.getOrders({ id: localStorage.getItem("id") });
        let orders = [
            {
                OrderId: 1,
                Name: "Order 1",
                DeliveryDate: "12/12/12",
                status: "IN TRANSIT",
                billingDetails: "NAME OF THE PERSON",
                PaymentDetails: "123456789012",
                Address: "ADDRESS",
            },
            {
                OrderId: 2,
                Name: "Order 2",
                DeliveryDate: "12/12/12",
                status: "IN TRANSIT",
                billingDetails: "NAME OF THE PERSON",
                PaymentDetails: "123456789012",
                Address: "ADDRESS",
            }
        ]
        this.setState({
            orders : orders
        })
    }

    render() {
        let orders = null;
        if(this.state.orders.length === 0 ){
            orders = "No Orders Placed";
        }else {
            orders = this.state.orders.map((elem, i) => {
                return <div key={i} className = "card card-body">
                    
                                
                    <div>
                        <h5>{elem.Name}</h5>     
                        <button className="btn btn-light float-right" type="button" data-toggle="collapse" data-target={"#collapseExample"+i} aria-expanded="false" aria-controls={"collapseExample"+i}>
                            View Details
                        </button>
                        <h6>Status : {elem.status}</h6>
                        <h6>Delivery Date : {elem.DeliveryDate}</h6>
                    
                    </div>
                    <div class="collapse" id={"collapseExample" + i}>
                            <div class="card card-body">
                                Billing Details : {elem.billingDetails}<br/>
                                PaymentDetails :{elem.PaymentDetails}<br/>
                                Address : {elem.Address}
                            </div>
                        </div>
                </div>
            })
        }
        return <div className="container" style={{marginTop: "2%"}}>
       {orders}
        </div>
    }

}
const map = state => {
    return {
        orders: state.cart.orders
    }
}
export default connect(map, { getOrders })(Orders);