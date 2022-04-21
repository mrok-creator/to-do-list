import { addToLocalStorage, getToLocalSTorage } from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";
import { headerRef, toDoInputRef, addTaskBtnRef, taskListRef } from "./refs.js";

function onClickCreateTask() {
  const task = toDoInputRef.value.trim();
  if (!task) return;

  const dataTask = objDataCreate(task);
  addToLocalStorage(KEY_LOCAL_STORAGE, dataTask);
  toDoInputRef.value = "";
  addNewTask(dataTask);
}

function objDataCreate(text, statusbar = false) {
  return {
    text,
    id: Date.now(),
    statusbar,
  };
}

function init() {
  const data = getToLocalSTorage(KEY_LOCAL_STORAGE);
  console.log(data);
  if (!data) return;
  const tasks = createLiMarkup(data);
  console.log(tasks);
  addMarkup(tasks);
}
function createLiMarkup(task) {
  return task
    .map(
      ({ text, id, statusbar }) =>
        `<li class="${statusbar ? "checked" : ""}" data-id="${id}">${text}</li>`
    )
    .join("");
}
function addMarkup(text) {
  taskListRef.insertAdjacentHTML("beforeend", text);
}
addTaskBtnRef.addEventListener("click", onClickCreateTask);
init();
function addNewTask(object) {
  const markUp = createLiMarkup([object]);
  addMarkup(markUp);
}
