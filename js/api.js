function addToLocalStorage(key, obj) {
  const data = getToLocalSTorage(key);
  let array = [];
  if (data) {
    array = [...data, obj];
  } else {
    array.push(obj);
  }
  localStorage.setItem(key, JSON.stringify(array));
}

function getToLocalSTorage(key) {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    return JSON.parse(stringData);
  }
  return null;
}

export { addToLocalStorage };
