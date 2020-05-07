
import { GET_CART, GET_ORDERS } from "../../../Redux/constants/action-types";

const initialState = {
    cart : [],
    saveForLater : [],
    orders : []
};

function cartReducer(state = initialState, action) {
    if (action.type === GET_CART) {
        console.log("action payload", action.payload.Cart)
        return Object.assign({}, state, { 
            cart: action.payload.Cart ,
            saveForLater : action.payload.SaveForLater
        });
    }
    else if (action.type === GET_ORDERS) {
        console.log("action payload Orders : ", action.payload)
        return Object.assign({}, state, { 
            orders : action.payload
        });
    }
    return state;
}

export default cartReducer;
