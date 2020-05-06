import React, { Component } from "react";
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import CustomerProductDashBoard from './components/customer/products/productDashBoard';
import SellerProductDashBoard from './components/seller/products/productDashBoard';
import CustomerNavBar from './components/customer/navbar/navbar';
import SellerNavBar from './components/seller/navbar/navbar';
import AdminNavBar from './components/admin/navbar/navbar';

import CustomerHome from './components/customer/home/home';
import Cart from './components/customer/cart/cart';
import Payment from "./components/customer/payment/payment";
import SaveForLater from './components/customer/saveForLater/saveForLater';


import CustomerProfile from './components/customer/customerProfile/customerProfile';
import SellerProfile from './components/seller/sellerProfile/sellerProfile';

import Dashboard from './components/admin/adminDashboard/dashboard';


class Main extends Component {
    render() {
        return (
           
            <BrowserRouter>
                <div>
                    <Route path="/login"> <CustomerLogin /> </Route>
                    
                    <Route path="/signUp"><CustomerSignUp /></Route>

                    <Route path="/seller"><SellerNavBar></SellerNavBar></Route>
                    <Route path="/seller/product"><SellerProductDashBoard /></Route>

                    <Route path="/customer"><CustomerNavBar></CustomerNavBar></Route>
                    <Route path="/customer/product"><CustomerProductDashBoard /></Route>
                    <Route path="/customer/home"><CustomerHome /></Route>
                    <Route path="/customer/cart"><Cart /></Route>
                    <Route path="/customer/payment"><Payment /></Route>
                    <Route path="/customer/saveForLater"><SaveForLater /></Route>

                    <Route path="/admin"><AdminNavBar></AdminNavBar></Route>

                    <Route path="/customer/Profile"><CustomerProfile /></Route>
                <Route path="/seller/Profile"><SellerProfile /></Route>
                <Route path="/admin/Dashboard"><Dashboard /></Route>

                </div>
            </BrowserRouter>
        )
    }
}
export default Main;
