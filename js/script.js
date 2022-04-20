import { addToLocalStorage } from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";

const headerRef = document.querySelector(".header");
const toDoInputRef = headerRef.querySelector("#myInput");
const addTaskBtnRef = headerRef.querySelector(".addBtn");

function onClickCreateTask() {
  const task = toDoInputRef.value.trim();
  if (!task) return;

  const dataTask = objDataCreate(task);
  addToLocalStorage(KEY_LOCAL_STORAGE, dataTask);
}

function objDataCreate(text, statusbar = false) {
  return {
    text,
    id: Date.now(),
    statusbar,
  };
}

addTaskBtnRef.addEventListener("click", onClickCreateTask);
