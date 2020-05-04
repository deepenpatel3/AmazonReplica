import { CUSTOMER_GET_PRODUCTS } from '../../constants/action-types';

const initialState = {
    signInSuccess: null, message: ""
};

const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_GET_PRODUCTS:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                products: action.payload.docs,
                totalDocs: action.payload.totalDocs,
                limit: action.payload.limit,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                pagingCounter: action.payload.pagingCounter,
                hasPrevPage: action.payload.hasPrevPage,
                hasNextPage: action.payload.hasNextPage,
                prevPage: action.payload.prevPage,
                nextPage: action.payload.nextPage,
            }
        default:
            return state;
    }
}

export default customerProductReducer;
