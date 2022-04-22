function addToLocalStorageObject(key, obj) {
  const data = getToLocalSTorage(key);
  let array = [];
  if (data) {
    array = [...data, obj];
  } else {
    array.push(obj);
  }
  addToLocalStorageArray(key, array);
}

function getToLocalSTorage(key) {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    return JSON.parse(stringData);
  }
  return null;
}

function addToLocalStorageArray(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

export { addToLocalStorageObject, getToLocalSTorage, addToLocalStorageArray };
