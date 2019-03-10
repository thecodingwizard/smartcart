import "whatwg-fetch";

import * as firebase from "firebase/app";
import "firebase/firestore";

export async function getItemReviews(upcCode) {
  firebase.firestore().collection("reviews").doc(upcCode).get().then(function (res) {
    return res.data();
  })
}