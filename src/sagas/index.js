import { all, fork } from "redux-saga/effects";
import itemsSaga from "./items.saga";

export default function* rootSaga() {
  yield all([
    fork(itemsSaga)
  ]);
}