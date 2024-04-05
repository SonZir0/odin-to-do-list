import { userData } from "./allTaskLists";
export const newListDialog = document.querySelector(".newList");

const input = document.querySelector('#newListName');

newListDialog.addEventListener("close", (event) => {
    if(newListDialog.returnValue === "submit") {
        userData.addTaskList(input.value);
    }
    clearListInput();
});

function clearListInput() {
    input.value = "";
    newListDialog.returnValue = "";
};