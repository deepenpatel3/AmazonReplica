import React, { Component } from "react";
import { Route } from 'react-router-dom';
import AdminLogin from './components/admin/adminLogin/adminLogin';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import SellerLogin from './components/seller/sellerLogin/sellerLogin';
import SellerSignUp from './components/seller/sellerSignUp/sellerSignUp';
import AdminSignUp from './components/admin/adminSignUp/adminSignUp';
import CustomerProductDashBoard from './components/customer/products/productDashBoard';
import SellerProductDashBoard from './components/seller/products/productDashBoard';
import CustomerNavBar from './components/customer/navbar/navbar';
import SellerNavBar from './components/seller/navbar/navbar';
import AdminNavBar from './components/admin/navbar/navbar';

import CustomerHome from './components/customer/home/home';
import Cart from './components/customer/cart/cart';
import Payment from "./components/customer/payment/payment";
import SaveForLater from './components/customer/saveForLater/saveForLater';
import { BrowserRouter, Redirect } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/login/seller"><SellerLogin /></Route>
                    <Route path="/login/customer"> <CustomerLogin /> </Route>
                    <Route path="/login/admin"><AdminLogin /></Route>
                    <Route path="/customerSignUp"><CustomerSignUp /></Route>
                    <Route path="/sellerSignUp"><SellerSignUp /></Route>
                    <Route path="/adminSignUp"><AdminSignUp /></Route>

                    <Route path="/seller"><SellerNavBar></SellerNavBar></Route>
                    <Route path="/seller/product"><SellerProductDashBoard /></Route>

                    <Route path="/customer"><CustomerNavBar></CustomerNavBar></Route>
                    <Route path="/customer/product"><CustomerProductDashBoard /></Route>
                    <Route path="/customer/home"><CustomerHome /></Route>
                    <Route path="/customer/cart"><Cart /></Route>
                    <Route path="/customer/payment"><Payment /></Route>
                    <Route path="/customer/saveForLater"><SaveForLater /></Route>

                    <Route path="/admin"><AdminNavBar></AdminNavBar></Route>
                </div>
            </BrowserRouter>
        )
    }
}
export default Main;
