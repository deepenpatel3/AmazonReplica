
import axios from 'axios';
import { GET_CART, GET_ORDERS } from "../../../Redux/constants/action-types";
const { backendURL } = require("../../../config");


export const getCart = (data) => dispatch => {
    console.log("inside get cart action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/customer/getCart', data)
        .then(response => {
            console.log("resonse", response.data)
            return dispatch(setCart(response.data))
        })
};
export const updateCart = (data) => dispatch => {
    console.log("inside get cart action");
    axios.defaults.withCredentials = true;
    axios.post(backendURL + '/customer/updateCart', data)
        .then(response => {
            console.log("DATA  :: " + response.data)
            if(response.data === true){
                axios.defaults.withCredentials = true;
                axios.post(backendURL + '/customer/getCart', data)
                    .then(response => {
                        console.log("resonse", response.data)
                        return dispatch(setCart(response.data))
                    })
            }
        })
} 

export const setCart = (data) => ({
    type: GET_CART,
    payload : data
})

export const getOrders = (data) => dispatch => {
    dispatch(setOrders(data))
}

export const setOrders = (data) => ({
    type : GET_ORDERS,
    payload : data
})