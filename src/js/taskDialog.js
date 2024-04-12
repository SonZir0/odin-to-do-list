import { addTaskToTheList } from "./allTaskLists";
import { addCardToPanel } from "./taskPanelDOM";

const newTaskForm = document.querySelector(".newTask");
const inputArr = Array.from(document.querySelectorAll('.newTask div label+*'));
const hiddenTaskID = document.querySelector('#taskIdForEdit');

export { addTaskFormHandler, displayTaskForm}

function addTaskFormHandler() {
    newTaskForm.addEventListener("close", (event) => {
        if (newTaskForm.returnValue === "submit")
            createOrEditTask();
        clearTaskInput();
    });
}

// for editListBtn - pass ID parameter of a parent li node
function displayTaskForm(idForEdit = false) {
    if (idForEdit) {
        hiddenTaskID.value = idForEdit;
        //fillInData(getTaskData(idForEdit));
        console.log("Edit doesn't work yet!");
    }
    newTaskForm.showModal();
}

function createOrEditTask() {
    const listID = (document.querySelector('.tasks > div')).dataset.listId;
    createTask(+listID);  // add edit later
}

function createTask(listID) {
    const formTaskInput = inputArr.map((inputField) => inputField.value);
    const currentTaskID = addTaskToTheList(listID, formTaskInput);
    addCardToPanel(listID, currentTaskID, formTaskInput);
}

/*function fillInData(name) {
    nameInput.value = name;
}*/

function clearTaskInput() {
    for (const inputField of inputArr) {
        inputField.value = inputField.dataset.default;
    }
    newTaskForm.returnValue = "";
    hiddenTaskID.value = null;
}