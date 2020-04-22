import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../constants/action-types";
const { backendURL } = require("../../../config");
import axios from 'axios';
const jwt_decode = require('jwt-decode');

export const adminLogin = (data) => {
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
        type: ADMIN_LOGIN,
        payload: { ...data }
    }
}


export const logout = () => ({
    type: ADMIN_LOGOUT
})
