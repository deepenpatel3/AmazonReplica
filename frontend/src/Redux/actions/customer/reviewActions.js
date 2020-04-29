import {CUSTOMER_GET_REVIEWS_FOR_PRODUCT} from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL +"/customer/review";


export const getReviewsForProduct = (productId) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getReviewsForProduct :");
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    axios.get(`${ROOT_URL}/reviews?product_id=${productId}`,config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_GET_REVIEWS_FOR_PRODUCT,
                    payload: {
                        reviews: response.data,
                        productId: productId
                    },
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}