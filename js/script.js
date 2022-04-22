import {
  addToLocalStorageObject,
  getFromLocalSTorage,
  addToLocalStorageArray,
} from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";
import { headerRef, toDoInputRef, addTaskBtnRef, taskListRef } from "./refs.js";

addTaskBtnRef.addEventListener("click", onClickCreateTask);
taskListRef.addEventListener("click", onTaskClick);
taskListRef.addEventListener("click", onDeleteBtnClick);
init();

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
  const data = getFromLocalSTorage(KEY_LOCAL_STORAGE);

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

  const dataArray = getFromLocalSTorage(KEY_LOCAL_STORAGE);
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

function onDeleteBtnClick(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  const doneTaskId = e.target.parentNode.dataset.id;

  const filteredData = dataFilter(
    getFromLocalSTorage(KEY_LOCAL_STORAGE),
    doneTaskId
  );
  console.log(filteredData);
  addToLocalStorageArray(KEY_LOCAL_STORAGE, filteredData);
  e.target.parentNode.remove();
}

function dataFilter(array, dataId) {
  return array.filter((element) => String(element.id) !== dataId);
}
