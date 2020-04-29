import {CUSTOMER_GET_PRODUCTS} from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL +"/customer/product";

export const getProducts = (productData, page,limit) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getProducts :");
    console.log(" page :",page);
    console.log(" limit :",limit);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    if(!page){
        page = 1;
    }
    if(!limit){
        limit = 8;
    }
    if(productData){
        if (page > productData.totalPages){
            page = 1
        }
    }
    axios.get(`${ROOT_URL}/products?page=${page}&limit=${limit}`,config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_GET_PRODUCTS,
                    payload: response.data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}