import { CUSTOMER_LOGIN , CUSTOMER_LOGOUT } from "../../constants/action-types";

const initialState = {
    
};

function sellerLoginReducer(state = initialState, action) {
  if (action.type === CUSTOMER_LOGIN) {
    return Object.assign({}, state, {
      id: action.payload.id,
    
    });
  }
  else if(action.type === CUSTOMER_LOGOUT){
    return Object.assign({}, state, {
      id: '',
    
    });
  }
  return state;
}

export default sellerLoginReducer;
