
import axios from 'axios';
import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../../../js/constants/action-types";
const { backendURL } = require("../../../config");
const jwt_decode = require('jwt-decode');

export const customerLogin = (data) => dispatch => {
    console.log("inside login action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/customer/signIn', data)
        .then(response => {
            // console.log("resonse", response)
            return dispatch(setLoginCredentials(response.data.token))
        })
};

const setLoginCredentials = (token) => {
    var decoded = jwt_decode(token.split(' ')[1]);
    if (decoded.signInSuccess) {
        localStorage.setItem("token", token)
        localStorage.setItem("id", decoded.CID);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("type", "customer");
    }
    return {
        type: CUSTOMER_LOGIN,
        payload: { ...decoded }
    }
}
export const logout = () => ({
    type: CUSTOMER_LOGOUT
})
