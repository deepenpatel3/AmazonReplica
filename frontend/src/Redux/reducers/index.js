import { combineReducers } from 'redux';
import sellerLoginReducer from './seller/loginReducer';
import customerLoginReducer from "./customer/loginReducer";
import adminLoginReducer from "./admin/loginReducer";
import customerPaymentReducer from "./customer/payment"

const rootReducer = combineReducers({
    sellerLogin : sellerLoginReducer,
    customerLogin : customerLoginReducer,
    adminLogin : adminLoginReducer,
    customerPayment : customerPaymentReducer
})

export default rootReducer;