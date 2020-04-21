import React, { Component } from "react";
import { Route } from 'react-router-dom';
import SellerLogin from './components/seller/sellerLogin/sellerLogin';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import AdminLogin from './components/admin/adminLogin/adminLogin';
class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/sellerLogin">
                    <SellerLogin />
                </Route>
                <Route path="/customerLogin">
                    <CustomerLogin />
                </Route>
                <Route path="/adminLogin">
                    <AdminLogin />
                </Route>
            </div>
        )
    }
}
export default Main;