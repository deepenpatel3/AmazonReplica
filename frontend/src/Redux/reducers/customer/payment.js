
import { GET_ADDRESS_DETAILS,GET_CART_DETAILS,GET_PAYMENT_DETAILS } from "../../../Redux/constants/action-types";

const initialState = {
    savedAddress : [],
    payment : [],
    cart : []
};

function customerPaymentReducer(state = initialState, action) {
    if (action.type === GET_ADDRESS_DETAILS) {
        console.log("action payload", action.payload)
        return Object.assign({}, state, 
            { 
                savedAddress: action.payload,
            });
    }
    else if (action.type === GET_CART_DETAILS) {
        return Object.assign({}, state, {
            cart: action.payload,
        });
    }

    else if (action.type === GET_PAYMENT_DETAILS) {
        return Object.assign({}, state, {
            payment: action.payload,
        });
    }
    return state;
}

export default customerPaymentReducer;
