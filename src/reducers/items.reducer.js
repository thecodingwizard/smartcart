import * as fromActions from "../actions";

const initialState = {
  currentItem: null,
  loading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch(action.type) {
    case fromActions.GET_ITEM:
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