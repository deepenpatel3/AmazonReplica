import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Home from './components/Home/home';
import AdminLogin from './components/admin/adminLogin/adminLogin';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import SellerLogin from './components/seller/sellerLogin/sellerLogin';
import SellerSignUp from './components/seller/sellerSignUp/sellerSignUp';
import AdminSignUp from './components/admin/adminSignUp/adminSignUp';
import Navbar from './components/admin/navbar/navbar';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/"><Home /></Route>
                <Route path="/home"><Home /></Route>
                <Route path="/sellerLogin"><SellerLogin /></Route>
                <Route path="/customerLogin"> <CustomerLogin /> </Route>
                <Route path="/adminLogin"><AdminLogin /></Route>
                <Route path="/customerSignUp"><CustomerSignUp /></Route>
                <Route path="/sellerSignUp"><SellerSignUp /></Route>
                <Route path="/adminSignUp"><AdminSignUp /></Route>
                <Route path="/navbar"><Navbar /></Route>
            </div>
        )
    }
}
export default Main;
