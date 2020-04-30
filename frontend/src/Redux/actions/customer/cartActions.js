
import axios from 'axios';
import { GET_CART } from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");


export const getCart = (data) => dispatch => {
    console.log("inside get cart action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/customer/getCart', data)
        .then(response => {
            console.log("resonse @@@@@", response.data)
            return dispatch(setCart(response.data))
        })
};


export const setCart = (data) => ({
    type: GET_CART,
    payload : data
})
