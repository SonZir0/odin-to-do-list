import cogIcon from './../icons/cog-svgrepo-com.svg';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { addListDialogHandler, newListDialog } from "./listDialog";

const taskGroups = document.querySelector('.taskGroups');
const userTaskLists = document.querySelector('ul');

// everything from other files that needed to function
export function pageInit() {
    initAddListrightBtn();
    addListDialogHandler();
}

export function addListTab(name, currentListID) {
    const newTaskList = document.createElement('li');
    newTaskList.dataset.ID = currentListID;
    const leftBtn = document.createElement('button');
    leftBtn.textContent = name;
    newTaskList.appendChild(leftBtn);
    addRenameRemoveMenu(newTaskList);
    userTaskLists.appendChild(newTaskList);
}

function addRenameRemoveMenu(liNode) {
    const rightBtn = document.createElement('button');
    const optionsIcon = new Image(35, 35);
    optionsIcon.src = cogIcon;
    rightBtn.setAttribute('aria-label', 'Edit');
    rightBtn.appendChild(optionsIcon);
    liNode.appendChild(rightBtn);
}

function initAddListrightBtn() {
    const addListrightBtn = document.createElement('button');
    const plusImg = new Image(35, 35);
    plusImg.src = plusIcon;
    addListrightBtn.appendChild(plusImg);
    addListrightBtn.classList.add('addNewList');
    addListrightBtn.setAttribute('aria-label', 'Add new task list');
    taskGroups.appendChild(addListrightBtn);

    addListrightBtn.addEventListener("click", (event) => {
        newListDialog.showModal();
    });
}