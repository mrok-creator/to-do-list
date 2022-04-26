import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  remove,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.11/firebase-database.min.js";

import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);

const db = getDatabase();
function addToFirebaseObj(key, obj) {
  try {
    set(ref(db, key + "/" + obj.id), obj);
  } catch (error) {
    console.log(error);
  }
}
function getFromFirebase(key) {
  return get(ref(db, key))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function removeElementFromFirebase(key, id) {
  try {
    remove(ref(db, key + `/` + id));
  } catch (error) {
    console.log(error);
  }
}

export { addToFirebaseObj, getFromFirebase, removeElementFromFirebase };
