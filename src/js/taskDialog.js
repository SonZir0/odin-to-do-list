import { addTaskToTheList, getTaskDataFromTaskList, editTaskDataFromTaskList,
         deleteTaskFromTaskList } from "./allTaskLists";
import { addCardToPanel, editTaskCardOnDisplay, deleteTaskCardFromDisplay } from "./taskPanelDOM";

const newTaskForm = document.querySelector(".newTask");
const inputArr = Array.from(document.querySelectorAll('.newTask div label+*'));
const hiddenTaskID = document.querySelector('#taskIdForEdit');
const hiddenFromListID = document.querySelector('#fromListId');
const deleteTaskBtn = document.querySelector('#deleteTaskBtn');

export { addTaskFormHandler, displayTaskForm }

function addTaskFormHandler() {
    newTaskForm.addEventListener("close", () => {
        if (newTaskForm.returnValue === "submit")
            createOrEditTask();
        else if (newTaskForm.returnValue === "delete")
            deleteTask();
        clearTaskInput();
    });
}

// for editTaskCard - pass ID parameter of a card and parent list
function displayTaskForm(taskIdForEdit = false, fromListID) {
    hiddenFromListID.value = fromListID;
    if (taskIdForEdit) {
        hiddenTaskID.value = taskIdForEdit;
        deleteTaskBtn.removeAttribute('hidden');
        loadTaskDataInForm(fromListID, taskIdForEdit);
    }
    newTaskForm.showModal();
}

function createOrEditTask() {
    const listID = hiddenFromListID.value;
    const taskID = hiddenTaskID.value;
    const inputValuesArr = inputArr.map((inputField) => inputField.value);

    if (taskID)
        editTask(listID, taskID, inputValuesArr);
    else createTask(listID, inputValuesArr);
}

function createTask(listID, inputValuesArr) {
    const currentTaskID = addTaskToTheList(listID, inputValuesArr);
    addCardToPanel(listID, currentTaskID, inputValuesArr);
}

function loadTaskDataInForm(fromListID, taskIdForEdit) {
    const taskDataArr = getTaskDataFromTaskList(fromListID, taskIdForEdit);
    inputArr.forEach(function (inputField, i) {
        inputField.value = taskDataArr[i];
    });
}

function editTask(listID, taskID, inputValuesArr) {
    //add edit cards on data and DOM sides
    editTaskDataFromTaskList(listID, taskID, inputValuesArr);
    editTaskCardOnDisplay(listID, taskID, ...inputValuesArr);
}

function deleteTask() {
    const taskID = hiddenTaskID.value;
    const listID = hiddenFromListID.value;
    deleteTaskFromTaskList(listID, taskID);
    deleteTaskCardFromDisplay(listID, taskID);
}

function clearTaskInput() {
    for (const inputField of inputArr) {
        inputField.value = inputField.dataset.default;
    }
    newTaskForm.returnValue = "";
    hiddenTaskID.value = null;
    hiddenFromListID.value = null;
    deleteTaskBtn.setAttribute('hidden', 'hidden');
}