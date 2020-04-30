import { CUSTOMER_GET_REVIEWS_FOR_PRODUCT } from '../../constants/action-types';

const initialState = {

};

const customerReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_GET_REVIEWS_FOR_PRODUCT:
            console.log("Details Payload:")
            console.log(action.payload)
            return {
                ...state,
                productId: action.payload.productId,
                reviews: action.payload.reviews,
            }
        default:
            return state;
    }
}

export default customerReviewReducer;