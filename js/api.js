import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  get,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.11/firebase-database.min.js";
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);

//  const newPostKey = push(child(ref(db), 'posts')).key;
// function addToLocalStorageObject(key, obj) {
//   const data = getToLocalSTorage(key);
//   let array = [];
//   if (data) {
//     array = [...data, obj];
//   } else {
//     array.push(obj);
//   }
//   addToLocalStorageArray(key, array);
// }
const db = getDatabase();
function addToLocalStorageObject(key, obj) {
  try {
    push(ref(db, key), obj);
  } catch (error) {
    console.log(error);
}

// function getFromLocalSTorage(key) {
//   const stringData = localStorage.getItem(key);
//   if (stringData) {
//     return JSON.parse(stringData);
//   }
//   return null;
// }
function getFromLocalSTorage(key) {
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

function addToLocalStorageArray(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

export { addToLocalStorageObject, getFromLocalSTorage, addToLocalStorageArray };
