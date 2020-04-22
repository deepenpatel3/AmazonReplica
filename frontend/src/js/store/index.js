import { createStore, applyMiddleware , compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
const storeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
);
//window.store = store
export default store;
