export const GET_ITEM_DETAILS = "[Items] Get Item Details";

export function getItemDetails(upcCode) {
  return {
    type: GET_ITEM_DETAILS,
    upcCode
  };
}