export const GET_ITEM_DETAILS = "[Items] Get Item Details";
export const GET_ITEM_DETAILS_SUCCESS = "[Items] Get Item Details Success";
export const GET_ITEM_DETAILS_FAIL = "[Items] Get Item Details Fail";
export const GET_ITEM_NOT_FOUND = "[Items] Get Item Not Found";

export function getItemDetails(upcCode) {
  return {
    type: GET_ITEM_DETAILS,
    upcCode
  };
}

export function getItemDetailsSuccess(itemDetails) {
  return {
    type: GET_ITEM_DETAILS_SUCCESS,
    itemDetails
  };
}

export function getItemDetailsFail(error) {
  return {
    type: GET_ITEM_DETAILS_FAIL,
    error
  };
}

export function getItemNotFound() {
  return {
    type: GET_ITEM_NOT_FOUND
  };
}

export const ADD_ITEM = "[Items] Add Item";
export const ADD_ITEM_SUCCESS = "[Items] Add Item Success";
export const ADD_ITEM_ERROR = "[Items] Add Item Error";

export function addItem(data) {
  return {
    type: ADD_ITEM,
    data
  };
}

export function addItemSuccess(data) {
  return {
    type: ADD_ITEM_SUCCESS,
    data
  };
}

export function addItemError(error) {
  return {
    type: ADD_ITEM_ERROR,
    error
  };
}

export const GET_ITEM_REVIEWS = "[Items] Get Item Reviews";
export const GET_ITEM_REVIEWS_SUCCESS = "[Items] Get Item Reviews Success";
export const GET_ITEM_REVIEWS_FAIL = "[Items] Get Item Reviews Fail";

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
