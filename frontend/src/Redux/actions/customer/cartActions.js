
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

export const placeOrder = (data) => dispatch => {
    console.log("Inside place Order")
    axios.post(backendURL + '/orders/placeOrder' , data).then(res => {
        dispatch(getCart({id : localStorage.getItem("id")}))
    })
}

export const getOrders = (data) => dispatch => {
    console.log("Inside place Order")
    axios.get(backendURL + "/orders/?CustomerID=" + data.CustomerID).then(res => {
        console.log("ORDERS : " + res.data)
        dispatch(setOrders(res.data))
    }).catch((err) => {
        console.log("ERROR ::::>" + err )
    })
}


export const setOrders = (data) => ({
    type : GET_ORDERS,
    payload : data
})

