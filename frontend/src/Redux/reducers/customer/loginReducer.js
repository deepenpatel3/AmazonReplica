
import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../../../js/constants/action-types";

const initialState = {
    signInSuccess: null, message: ""
};

function sellerLoginReducer(state = initialState, action) {
    if (action.type === CUSTOMER_LOGIN) {
        return Object.assign({}, state, { signInSuccess: action.payload.signInSuccess, message: action.payload.message });
    }
    else if (action.type === CUSTOMER_LOGOUT) {
        return Object.assign({}, state, {
            id: '',

        });
    }
    return state;
}

export default sellerLoginReducer;
