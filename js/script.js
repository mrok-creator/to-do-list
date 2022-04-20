import { addToLocalStorage } from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";
import { headerRef, toDoInputRef, addTaskBtnRef } from "./refs.js";

function onClickCreateTask() {
  const task = toDoInputRef.value.trim();
  if (!task) return;

  const dataTask = objDataCreate(task);
  addToLocalStorage(KEY_LOCAL_STORAGE, dataTask);
  toDoInputRef.value = "";
}

function objDataCreate(text, statusbar = false) {
  return {
    text,
    id: Date.now(),
    statusbar,
  };
}

addTaskBtnRef.addEventListener("click", onClickCreateTask);
