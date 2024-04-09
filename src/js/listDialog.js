import { addTaskList } from "./allTaskLists";
import { addListTab } from "./listsPanelDOM";

export const newListForm = document.querySelector(".newList");
const input = document.querySelector('#newListName');

export function addListFormHandler() {
    newListForm.addEventListener("close", (event) => {
        if (newListForm.returnValue === "submit")
            createOrEditList();
        clearListInput();
    });
}

function createOrEditList() {
    createList();  // add edit later
}

function createList() {
    const currentListID = addTaskList(input.value);
    addListTab(input.value, currentListID);
};

function clearListInput() {
    input.value = "";
    newListForm.returnValue = "";
};