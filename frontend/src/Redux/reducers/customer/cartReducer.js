
import { GET_CART } from "../../../Redux/constants/action-types";

const initialState = {
    cart : [],
    saveForLater : []
};

function cartReducer(state = initialState, action) {
    if (action.type === GET_CART) {
        console.log("action payload", action.payload.Cart)
        return Object.assign({}, state, { 
            cart: action.payload.Cart ,
            saveForLater : action.payload.SaveForLater
        });
    }
    return state;
}

export default cartReducer;
