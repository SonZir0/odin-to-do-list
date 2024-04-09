import { addTaskList, editTaskListData, getTaskListData } from "./allTaskLists";
import { addListTab, editListTab } from "./listsPanelDOM";

const newListForm = document.querySelector(".newList");
const nameInput = document.querySelector('#newListName');
const hiddenID = document.querySelector('input[type="hidden"]');

export function addListFormHandler() {
    newListForm.addEventListener("close", (event) => {
        if (newListForm.returnValue === "submit")
            createOrEditList();
        clearListInput();
    });
}

// for editListBtn - pass ID parameter of a parent li node
export function displayNewListForm(idForEdit = false) {
    if (idForEdit) {
        hiddenID.value = idForEdit;
        fillInData(getTaskListData(idForEdit));
    }
    newListForm.showModal();
}

function createOrEditList() {
    if (hiddenID.value)
        editList();
    else createList();
}

function createList() {
    const currentListID = addTaskList(nameInput.value);
    addListTab(currentListID, nameInput.value);
};

function fillInData(name) {
    nameInput.value = name;
}

function editList() {
    editListTab(hiddenID.value, nameInput.value);
    editTaskListData(hiddenID.value, nameInput.value);
}

function clearListInput() {
    nameInput.value = "";
    newListForm.returnValue = "";
    hiddenID.value = null;
};