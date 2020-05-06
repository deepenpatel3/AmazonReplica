import {CUSTOMER_GET_PRODUCTS} from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL +"/customer/product";

export const getProducts = (productData, page,limit,Name,Categories) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getProducts :");
    console.log(" page :",page);
    console.log(" limit :",limit);
    console.log(" Name : ", Name);
    
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    if(Name === undefined){
        Name = ""
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
    
    axios.get(`${ROOT_URL}/products?page=${page}&limit=${limit}&name=${Name}`,config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            if (response.status == 200) {
                let data1 = { ...response.data }
                data1.name = Name;
                data1.categories = Categories 
                dispatch({
                    type: CUSTOMER_GET_PRODUCTS,
                    payload: data1,
                })
            }
        },
            error => {
                console.log(" error:", JSON.stringify(error));
            })
}