import React, { Component } from "react";
import { Route } from 'react-router-dom';
import AdminLogin from './components/admin/adminLogin/adminLogin';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import SellerLogin from './components/seller/sellerLogin/sellerLogin';
import SellerSignUp from './components/seller/sellerSignUp/sellerSignUp';
import AdminSignUp from './components/admin/adminSignUp/adminSignUp';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/sellerLogin"><SellerLogin /></Route>
                <Route path="/customerLogin"> <CustomerLogin /> </Route>
                <Route path="/adminLogin"><AdminLogin /></Route>
                <Route path="/customerSignUp"><CustomerSignUp /></Route>
                <Route path="/sellerSignUp"><SellerSignUp /></Route>
                <Route path="/adminSignUp"><AdminSignUp /></Route>
                
            </div>
        )
    }
}
export default Main;