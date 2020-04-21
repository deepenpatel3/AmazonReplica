import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../constants/action-types";
const { backendURL } = require("../../../config");
import axios from 'axios';
const jwt_decode = require('jwt-decode');

export const customerLogin = (data) => {
    return (dispatch) => {
        console.log("inside login action");
        let data1 = {};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(backendURL + '/custlogin', data)
            .then(response => {
                // WRITE YOUR LOGIC HERE --> DEEPEN
                // --> dispatch(setLoginCredentials)
            })
    }
};

export const setLoginCredentials = (data) => {
    return {
        type: CUSTOMER_LOGIN,
        payload: { ...data }
    }
}


export const logout = () => ({
    type: CUSTOMER_LOGOUT
})
