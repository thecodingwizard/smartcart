import { call, put, takeLatest, all } from "redux-saga/effects";
import * as upcService from "../services/item.service";
import * as itemsActions from "../actions/items.actions";
import * as firebase from "firebase/app";
import "firebase/firestore";

function* getItemDetails(action) {
  try {
    const response = yield call(upcService.getUPCItem, action.upcCode);
    if (response === undefined) {
      yield put(itemsActions.getItemNotFound());
    } else {
      yield put(itemsActions.getItemDetailsSuccess(response));
    }
  } catch (e) {
    yield put(itemsActions.getItemDetailsFail(e.message));
  }
}

function addItem(action) {
  // action.data = item data
  firebase.firestore().collection("products").doc(action.data.upc).set({
    category:action.data.category,
    name:action.data.name,
    nutritions:[action.data.nMap],
    ingredients: action.data.ingredients,
  });
}

function* itemsSaga() {
  yield all([
    takeLatest(itemsActions.GET_ITEM_DETAILS, getItemDetails),
    takeLatest(itemsActions.ADD_ITEM, addItem),
  ]);
}
export default itemsSaga;
