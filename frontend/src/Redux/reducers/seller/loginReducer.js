
import { SELLER_LOGIN, SELLER_LOGOUT } from "../../../js/constants/action-types";

const initialState = {
};

function sellerLoginReducer(state = initialState, action) {
  if (action.type === SELLER_LOGIN) {
    return Object.assign({}, state, {
      id: action.payload.id
    });
  }
  else if (action.type === SELLER_LOGOUT) {
    return Object.assign({}, state, {
      id: ''
    });
  }
  return state;
}

export default sellerLoginReducer;
