
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../../js/constants/action-types";

const initialState = {

};

function adminLoginReducer(state = initialState, action) {
  if (action.type === ADMIN_LOGIN) {
    return Object.assign({}, state, {
      id: action.payload.id
    });
  }
  else if (action.type === ADMIN_LOGOUT) {
    return Object.assign({}, state, {
      id: '',

    });
  }
  return state;
}

export default adminLoginReducer;
