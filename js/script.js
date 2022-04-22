import {
  addToLocalStorageObject,
  getToLocalSTorage,
  addToLocalStorageArray,
} from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";
import { headerRef, toDoInputRef, addTaskBtnRef, taskListRef } from "./refs.js";

function onClickCreateTask() {
  const task = toDoInputRef.value.trim();
  if (!task) return;

  const dataTask = objDataCreate(task);
  addToLocalStorageObject(KEY_LOCAL_STORAGE, dataTask);
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

  if (!data) return;
  const tasks = createLiMarkup(data);
  addMarkup(tasks);
}

function createLiMarkup(task) {
  return task
    .map(
      ({ text, id, statusbar }) =>
        `<li class="${statusbar ? "checked" : ""}" data-id="${id}">${text}
        <button type="button">&#10006;</button>
        </li>`
    )
    .join("");
}

function addMarkup(text) {
  taskListRef.insertAdjacentHTML("beforeend", text);
}

function onTaskClick(e) {
  if (e.target.nodeName !== "LI") {
    return;
  }
  e.target.classList.toggle("checked");

  const dataArray = getToLocalSTorage(KEY_LOCAL_STORAGE);
  const taskId = e.target.dataset.id;

  const updatedStatusBar = changeStatusBar(dataArray, taskId);
  addToLocalStorageArray(KEY_LOCAL_STORAGE, updatedStatusBar);
}

function changeStatusBar(array, taskId) {
  const arrayCopy = [...array];

  arrayCopy.forEach((element) => {
    if (element.id === Number(taskId)) {
      element.statusbar = !element.statusbar;
    }
  });

  return arrayCopy;
}

function addNewTask(object) {
  const markUp = createLiMarkup([object]);
  addMarkup(markUp);
}

addTaskBtnRef.addEventListener("click", onClickCreateTask);
taskListRef.addEventListener("click", onTaskClick);
init();
