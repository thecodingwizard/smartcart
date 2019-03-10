import { combineReducers } from "redux";
import items from "./items.reducer"
import reviews from "./reviews.reducer"

const rootReducer = combineReducers({
  items,
  reviews
});

export default rootReducer;