export const GET_ITEM_DETAILS = "[Items] Get Item Details";
export const GET_ITEM_DETAILS_SUCCESS = "[Items] Get Item Details Success";
export const GET_ITEM_DETAILS_FAIL = "[Items] Get Item Details Fail";

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