import 'whatwg-fetch';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export function getItemReviews(upcCode) {
  return firebase
    .firestore()
    .collection('review')
    .doc(upcCode)
    .collection('reviews')
    .get()
    .then(snapshot => snapshot.docs.map(d => d.data()));
}
