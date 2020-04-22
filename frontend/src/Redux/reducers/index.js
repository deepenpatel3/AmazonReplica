import { combineReducers } from 'redux';
import sellerLoginReducer from './seller/loginReducer';
import customerLoginReducer from "./customer/loginReducer";
import adminLoginReducer from "./admin/loginReducer";

const rootReducer = combineReducers({
    sellerLogin : sellerLoginReducer,
    customerLogin : customerLoginReducer,
    adminLogin : adminLoginReducer
})

export default rootReducer;