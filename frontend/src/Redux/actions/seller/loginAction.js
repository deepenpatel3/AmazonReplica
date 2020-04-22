import { SELLER_LOGIN, SELLER_LOGOUT } from "../constants/action-types";
const { backendURL } = require("../../../config");
import axios from 'axios';
const jwt_decode = require('jwt-decode');

export const sellerLogin = (data) => {
    return (dispatch) => {
        axios.post(backendURL + '/custlogin', data)
            .then(response => {
                // WRITE YOUR LOGIC HERE --> DEEPEN
                // --> dispatch(setLoginCredentials)
            })
    }
};


const setLoginCredentials = (data) => {
    return {
        type: LOGIN,
        payload: { ...data }
    }
}


export const logout = () => ({
    type: LOGOUT
})
