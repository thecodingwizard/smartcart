import * as fromActions from "../actions/items.actions";

const initialState = {
  itemDetails: null,
  loading: false,
  error: null,
  notFound: false,
};

const itemsReducer = (state = initialState, action) => {
  switch(action.type) {
    case fromActions.GET_ITEM_DETAILS:
      return {
        ...state,
        loading: true,
        itemDetails: null,
        notFound: false,
      };
    case fromActions.GET_ITEM_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        itemDetails: action.itemDetails
      };
    case fromActions.GET_ITEM_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case fromActions.GET_ITEM_NOT_FOUND:
      return {
        ...state,
        loading: false,
        error: null,
        notFound: true
      };
    case fromActions.ADD_ITEM:
      return {
        ...state,
        loading: true,
      };
    case fromActions.ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case fromActions.ADD_ITEM_ERROR:
      return {
        ...state,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

export default itemsReducer;