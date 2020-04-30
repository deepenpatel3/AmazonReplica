import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Home from './components/home/home';

import AdminLogin from './components/admin/adminLogin/adminLogin';
import CustomerLogin from './components/customer/customerLogin/customerLogin';
import CustomerSignUp from './components/customer/customerSignUp/customerSignUp';
import SellerLogin from './components/seller/sellerLogin/sellerLogin';
import SellerSignUp from './components/seller/sellerSignUp/sellerSignUp';
import AdminSignUp from './components/admin/adminSignUp/adminSignUp';
import CustomerProductDashBoard from './components/customer/products/productDashBoard';
import ProductDetailsDashBoard from './../src/components/customer/products/productDetailsDashBoard';

import CustomerHome from './components/customer/home/home';
import Cart from './components/customer/cart/cart';
import Payment from "./components/customer/payment/payment";
import SaveForLater from './components/customer/saveForLater/saveForLater';

import CustomerProfile from './components/customer/customerProfile/customerProfile';
//import SellerProfile from "./components/seller/sellerProfile/sellerProfile";

//<Route path="/seller/sellerProfile"><SellerProfile /></Route>

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
                <Route path="/customer/product"><CustomerProductDashBoard/></Route>
                <Route path="/customer/productDetails"><ProductDetailsDashBoard/></Route>
                <Route path="/customer/home"><CustomerHome /></Route>
                <Route path="/customer/cart"><Cart /></Route>
                <Route path="/customer/payment"><Payment /></Route>
                <Route path="/customer/saveForLater"><SaveForLater /></Route>
              
                <Route path="/customer/customerProfile"><CustomerProfile /></Route>
            </div>
        )
    }
}
export default Main;
