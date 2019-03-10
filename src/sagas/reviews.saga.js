import { call, put, takeLatest, all } from "redux-saga/effects";
import * as reviewsService from "../services/reviews.service";
import * as fromActions from "../actions/reviews.actions";

function* getItemReviews(action) {
  try {
    const response = yield call(reviewsService.getItemReviews, action.upcCode);
    yield put(fromActions.getItemReviewsSuccess(response));
  } catch (e) {
    yield put(fromActions.getItemReviewsFail(e.message));
  }
}

function* reviewsSaga() {
  yield all([
    takeLatest(fromActions.GET_ITEM_REVIEWS, getItemReviews),
  ]);
}
export default reviewsSaga;