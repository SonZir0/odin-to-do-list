import cogIcon from './../icons/cog-svgrepo-com.svg';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { addListFormHandler, newListForm } from "./listDialog";
import { displayTaskList } from './taskPanelDOM';

const taskGroupsSection = document.querySelector('.taskGroups');
const listOfTaskLists = document.querySelector('ul');
const showAllBtn = document.querySelector('.showAll');

export function listsPanelInit() {
    initAddListBtn();
    addListFormHandler();
}

export function addListTab(name, currentListID) {
    const newTaskTab = document.createElement('li');
    const leftBtn = document.createElement('button');

    newTaskTab.dataset.id = currentListID;
    leftBtn.textContent = name;
    leftBtn.addEventListener("click", displayTaskList);

    newTaskTab.appendChild(leftBtn);
    addRenameRemoveMenu(newTaskTab);
    listOfTaskLists.appendChild(newTaskTab);
    // later add listener to disable show all if the last list is removed
    if (showAllBtn.disabled)
        showAllBtn.disabled = false;
}

function addRenameRemoveMenu(liNode) {
    const rightBtn = document.createElement('button');
    const optionsIcon = new Image(35, 35);
    optionsIcon.src = cogIcon;
    rightBtn.setAttribute('aria-label', 'Edit');
    rightBtn.appendChild(optionsIcon);
    liNode.appendChild(rightBtn);
    //later add 2 more buttons in a hidden div to rename and edit List
}

function initAddListBtn() {
    const addListBtn = document.createElement('button');
    const plusImg = new Image(35, 35);
    plusImg.src = plusIcon;
    addListBtn.appendChild(plusImg);
    addListBtn.classList.add('addNewList');
    addListBtn.setAttribute('aria-label', 'Add new task list');
    taskGroupsSection.appendChild(addListBtn);

    addListBtn.addEventListener("click", () => newListForm.showModal());
}