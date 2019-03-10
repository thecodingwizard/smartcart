import * as fromActions from "../actions/items.actions";

const initialState = {
  itemDetails: null,
  loading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch(action.type) {
    case fromActions.GET_ITEM_DETAILS:
      return {
        ...state,
        loading: true,
      };
    default: {
      return state;
    }
  }
};

export default itemsReducer;