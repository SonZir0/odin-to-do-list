import { userData } from "./allTaskLists";
import { addListTab } from "./listsPanelDOM";

export const newListForm = document.querySelector(".newList");
const input = document.querySelector('#newListName');

export function addListFormHandler() {
    newListForm.addEventListener("close", (event) => {
        if (newListForm.returnValue === "submit")
            createOrEdit();
        clearListInput();
    });
}

function createOrEdit() {
    createList();  // add edit later
}

function createList() {
    const currentListID = userData.addTaskList(input.value);
    addListTab(input.value, currentListID);
};

function clearListInput() {
    input.value = "";
    newListForm.returnValue = "";
};