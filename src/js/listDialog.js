import { userData } from "./allTaskLists";
import { addListTab } from "./generalDOMStuff";

export const newListDialog = document.querySelector(".newList");
const input = document.querySelector('#newListName');

export function addListDialogHandler() {
    newListDialog.addEventListener("close", (event) => {
        if (newListDialog.returnValue === "submit")
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
    console.log(userData);
};

function clearListInput() {
    input.value = "";
    newListDialog.returnValue = "";
};