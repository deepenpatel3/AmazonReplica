
import axios from 'axios';
import { GET_ADDRESS_DETAILS, GET_PAYMENT_DETAILS,GET_CART_DETAILS } from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");
const jwt_decode = require('jwt-decode');

export function getAddressDetails (data,callback){
    console.log("inside customer paymnent action");
    axios.defaults.withCredentials = true;
    const request = axios.post(backendURL + '/customer/payment/address', data)       
        return (dispatch) => {
            request.then((res)=>{
                dispatch({
                    type: GET_ADDRESS_DETAILS,
                    payload : res.data
                });
                callback(res)
            })
        }
}

export function getPaymentDetails (data,callback){
    console.log("inside customer paymnent action");
    axios.defaults.withCredentials = true;
    const request = axios.post(backendURL + '/customer/payment/payment', data)       
        return (dispatch) => {
            request.then((res)=>{
                dispatch({
                    type: GET_PAYMENT_DETAILS,
                    payload : res.data
                });
                callback(res)
            })
        }
}

export function getCartDetails (data,callback){
    console.log("inside customer paymnent action");
    axios.defaults.withCredentials = true;
    const request = axios.post(backendURL + '/customer/payment/cart', data)       
        return (dispatch) => {
            request.then((res)=>{
                dispatch({
                    type: GET_CART_DETAILS,
                    payload : res.data
                });
                callback(res)
            })
        }
}