import { addTaskList, editTaskListData, getListEditableData } from "./allTaskLists";
import { addListTab, editListTab } from "./listsPanelDOM";

const newListForm = document.querySelector(".newList");
const inputArr = Array.from(document.querySelectorAll('.newList div label+*'));
const hiddenListID = document.querySelector('#listIdForEdit');

export { addListFormHandler, displayListForm }

function addListFormHandler() {
    newListForm.addEventListener("close", (event) => {
        if (newListForm.returnValue === "submit")
            createOrEditList();
        clearListInput();
    });
}

// for editListBtn - pass ID parameter of a parent li node
function displayListForm(idForEdit = false) {
    if (idForEdit) {
        hiddenListID.value = idForEdit;
        loadListData(idForEdit);
    }
    newListForm.showModal();
}

function createOrEditList() {
    const inputValuesArr = inputArr.map((inputField) => inputField.value);
    if (hiddenListID.value)
        editList(inputValuesArr);
    else createList(inputValuesArr);
}

function createList(inputValuesArr) {
    const currentListID = addTaskList(inputValuesArr);
    addListTab(currentListID, ...inputValuesArr);
};

function loadListData(listID) {
    const taskListDataArr = getListEditableData(listID);
    inputArr.forEach(function (inputField, i) {
        inputField.value = taskListDataArr[i];
    });
}

function editList(inputValuesArr) {
    editListTab(hiddenListID.value, ...inputValuesArr);
    editTaskListData(hiddenListID.value, inputValuesArr);
}

function clearListInput() {
    for (const inputField of inputArr) {
        inputField.value = inputField.dataset.default
    }
    newListForm.returnValue = "";
    hiddenListID.value = null;
};