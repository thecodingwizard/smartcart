export const GET_ITEM_REVIEWS = "[Reviews] Get Item Reviews";
export const GET_ITEM_REVIEWS_SUCCESS = "[Reviews] Get Item Reviews Success";
export const GET_ITEM_REVIEWS_FAIL = "[Reviews] Get Item Reviews Fail";

export function getItemReviews(upc) {
  return {
    type: GET_ITEM_REVIEWS,
    upcCode: upc
  };
}

export function getItemReviewsSuccess(reviews) {
  return {
    type: GET_ITEM_REVIEWS_SUCCESS,
    reviews
  };
}

export function getItemReviewsFail(error) {
  return {
    type: GET_ITEM_REVIEWS_FAIL,
    error
  };
}


// RIP not enough time; this is unused
export const ADD_ITEM_REVIEW = "[Reviews] Add Item Reviews";
export const ADD_ITEM_REVIEW_SUCCESS = "[Reviews] Add Item Reviews Success";
export const ADD_ITEM_REVIEW_FAIL = "[Reviews] Add Item Reviews Fail";

export function addItemReview(upcCode, data) {
  return {
    type: ADD_ITEM_REVIEW,
    upcCode, data
  };
}

export function addItemReviewSuccess() {
  return {
    type: ADD_ITEM_REVIEW_SUCCESS
  };
}

export function addItemReviewFail() {
  return {
    type: ADD_ITEM_REVIEW_FAIL
  };
}