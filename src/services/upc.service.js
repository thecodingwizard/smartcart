import "whatwg-fetch";
import * as firebase from "firebase/app";
import "firebase/firestore";
export async function getUPCItem(upcCode) {
  return await queryInternalDatabase(upcCode);
}
async function queryInternalDatabase(upc) {

  firebase.firestore().collection("products").doc(upc).get().then(function(doc) {

    let data = doc.data();
    return data;
  });
}