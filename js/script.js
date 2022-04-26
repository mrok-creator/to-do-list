import { addToFirebaseObj, getFromFirebase } from "./api.js";
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
  addToFirebaseObj(KEY_LOCAL_STORAGE, dataTask);
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

async function init() {
  const data = await getFromFirebase(KEY_LOCAL_STORAGE);
  console.log(data);
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

async function onTaskClick(e) {
  if (e.target.nodeName !== "LI") {
    return;
  }
  e.target.classList.toggle("checked");

  const dataArray = await getFromFirebase(KEY_LOCAL_STORAGE);
  console.log(dataArray);
  const taskId = e.target.dataset.id;
  console.log(taskId);
  const saveObj = changeStatusBar(dataArray, taskId);
  addToFirebaseObj(KEY_LOCAL_STORAGE, saveObj);
  console.log(saveObj);
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

  const filteredData = dataFilter(
    getFromFirebase(KEY_LOCAL_STORAGE),
    doneTaskId
  );
  console.log(filteredData);
  addToLocalStorageArray(KEY_LOCAL_STORAGE, filteredData);
  e.target.parentNode.remove();
}

function dataFilter(array, dataId) {
  return array.filter((element) => String(element.id) !== dataId);
}
