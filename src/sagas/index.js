import { all, fork } from "redux-saga/effects";
import itemsSaga from "./items.saga";
import reviewsSaga from "./reviews.saga";

export default function* rootSaga() {
  yield all([
    fork(itemsSaga),
    fork(reviewsSaga),
  ]);
}