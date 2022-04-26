import {
  addToFirebaseObj,
  getFromFirebase,
  removeElementFromFirebase,
} from "./api.js";
import { KEY_LOCAL_STORAGE } from "./constante.js";
import { headerRef, toDoInputRef, addTaskBtnRef, taskListRef } from "./refs.js";
import { objDataCreate } from "./model.js";
import { createLiMarkup } from "./views.js";

function onClickCreateTask() {
  const task = toDoInputRef.value.trim();
  if (!task) return;

  const dataTask = objDataCreate(task);
  addToFirebaseObj(KEY_LOCAL_STORAGE, dataTask);
  toDoInputRef.value = "";
  addNewTask(dataTask);
}

async function init() {
  const data = await getFromFirebase(KEY_LOCAL_STORAGE);
  if (!data) return;
  const tasks = createLiMarkup(data);
  addMarkup(tasks);
}

function addMarkup(text) {
  taskListRef.insertAdjacentHTML("beforeend", text);
}

async function onTaskClick(e) {
  if (e.target.nodeName !== "LI") {
    return;
  }
  e.target.classList.toggle("checked");

  const dataArray = await getFromFirebase(KEY_LOCAL_STORAGE);
  const taskId = e.target.dataset.id;
  const saveObj = changeStatusBar(dataArray, taskId);
  addToFirebaseObj(KEY_LOCAL_STORAGE, saveObj);
}

function changeStatusBar(array, taskId) {
  const arrayCopy = [...array];
  let someObj = {};
  arrayCopy.forEach((element) => {
    if (element.id === Number(taskId)) {
      element.statusbar = !element.statusbar;
      someObj = element;
    }
  });

  return someObj;
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

  removeElementFromFirebase(KEY_LOCAL_STORAGE, doneTaskId);
  e.target.parentNode.remove();
}

init();

addTaskBtnRef.addEventListener("click", onClickCreateTask);
taskListRef.addEventListener("click", onTaskClick);
taskListRef.addEventListener("click", onDeleteBtnClick);
