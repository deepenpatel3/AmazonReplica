import { combineReducers } from 'redux';
import sellerLoginReducer from './seller/loginReducer';
import customerLoginReducer from "./customer/loginReducer";
import adminLoginReducer from "./admin/loginReducer";
import customerProductReducer from "./customer/productReducer";

const rootReducer = combineReducers({
    sellerLogin : sellerLoginReducer,
    customerLogin : customerLoginReducer,
    adminLogin : adminLoginReducer,
    customerProductData: customerProductReducer,
})

export default rootReducer;