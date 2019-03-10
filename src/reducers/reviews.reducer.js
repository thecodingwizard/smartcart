import * as fromActions from "../actions/reviews.actions";

const initialState = {
  itemReviews: null,
  loading: false,
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch(action.type) {
    case fromActions.GET_ITEM_REVIEWS:
      return {
        ...state,
        loading: true,
      };
    case fromActions.GET_ITEM_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        itemReviews: action.reviews
      };
    case fromActions.GET_ITEM_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default: {
      return state;
    }
  }
};

export default reviewsReducer;