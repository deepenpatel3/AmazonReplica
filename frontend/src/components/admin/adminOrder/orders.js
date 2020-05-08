import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
class AdminOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSellerName: "",
            orders: []
        }
    }

    componentDidMount() {
        this.getAllOrders()
    }

    getAllOrders() {
        Axios.post("http://localhost:3001/admin/orders/listOfOrders")
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        orders: response.data
                    })
                }
            })
    }

    handleSellerName = (event) => {
        this.setState({
            currentSellerName: event.target.value
        }, () => {
            if (this.state.currentSellerName == "") {
                this.getAllOrders()
            }
        })
    }

    handleSearch = (event) => {
        const data = {
            name: this.state.currentSellerName
        }
        Axios.post("http://localhost:3001/admin/orders/listOfOrders", data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        orders: response.data
                    })
                }
            })
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem("type") !== "admin") {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                <Navbar />
                {redirectVar}
                <div class="container">
                    <h5 className="text-center" style={{ fontFamily: "Officina Sans Bold", fontWeight: "700", margin: "0.1em" }}>Orders</h5>
                    <div className="row">
                        <div className="col-md-12"  >
                            <div className="form-inline my-2 my-lg-1" style={{ marginLeft: "10%" }}>

                                <form>
                                    <div className="form-group">
                                        <h5>Filters:</h5>
                                        <div className="br"></div>
                                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSellerName} value={this.state.currentSellerName} />
                                        <button class="btn btn-outline-warning my-2 my-sm-0" type="button" onClick={this.handleSearch}>Search by Seller </button>
                                    </div>
                                </form>
                                <div className="br"></div>

                                <form onSubmit={this.handleFilter}>
                                    <div className="form-group">
                                        <Select className="ui search dropdown" style={{ width: "13pc" }} value={this.state.value} onChange={this.handleChange}>
                                            <option value="category1">Order Placed</option>
                                            <option value="category2">Order shipped</option>
                                            <option value="category3">On the way</option>
                                            <option value="category4">Delivered</option>
                                        </Select>
                                        <div className="spacing_inv"></div>
                                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search by Status</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <hr />
                        Orders:
                        <table>
                        <th>Order Id</th>
                        <th>Price</th>
                        <th>Status</th>
                        {this.state.orders.map(order => (
                            <tr>
                                <td>{order.Order_id}</td>
                                <td>{order.Price}</td>
                                <td>{order.Tracking_Status}</td>
                            </tr>
                        ))}
                    </table>



                </div>
            </div>
        )
    }
}

export default AdminOrders;
