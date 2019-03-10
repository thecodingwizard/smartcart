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