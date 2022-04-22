function addToLocalStorageObject(key, obj) {
  const data = getFromLocalSTorage(key);
  let array = [];
  if (data) {
    array = [...data, obj];
  } else {
    array.push(obj);
  }
  addToLocalStorageArray(key, array);
}

function getFromLocalSTorage(key) {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    return JSON.parse(stringData);
  }
  return null;
}

function addToLocalStorageArray(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

export { addToLocalStorageObject, getFromLocalSTorage, addToLocalStorageArray };
