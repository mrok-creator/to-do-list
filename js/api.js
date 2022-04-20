function addToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export { addToLocalStorage };
