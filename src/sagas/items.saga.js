import { call, put, takeLatest, all } from "redux-saga/effects";
import * as upcService from "../services/upc.service";
import * as itemsActions from "../actions/items.actions";

function* getItemDetails(action) {
  try {
    const response = yield call(upcService.getUPCItem, action.upcCode);
    if (response === null) {
      yield put(itemsActions.getItemNotFound());
    } else {
      yield put(itemsActions.getItemDetailsSuccess(response));
    }
  } catch (e) {
    yield put(itemsActions.getItemDetailsFail(e.message));
  }
}

function* itemsSaga() {
  yield all([
    takeLatest(itemsActions.GET_ITEM_DETAILS, getItemDetails),
  ]);
}

export default itemsSaga;