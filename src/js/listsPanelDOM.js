import cogIcon from './../icons/cog-svgrepo-com.svg';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { displayListForm } from "./listDialog";
import { displayTaskList } from './taskPanelDOM';

const taskGroupsSection = document.querySelector('.taskGroups');
const listOfTaskLists = document.querySelector('ul');
const showAllBtn = document.querySelector('.showAll');

export { addListTab, editListTab, initAddListBtn}

function addListTab(currentListID, name) {
    const newTaskListTab = document.createElement('li');
    const leftBtn = document.createElement('button');

    newTaskListTab.dataset.id = currentListID;
    leftBtn.textContent = name;
    leftBtn.addEventListener("click", () => { loadClickedList(leftBtn.parentElement); });

    newTaskListTab.appendChild(leftBtn);
    addRenameRemoveMenu(newTaskListTab);
    listOfTaskLists.appendChild(newTaskListTab);
    // later add listener to disable show all if the last list is removed
    showAllBtn.disabled = false;
}

function editListTab(currentListID, newName) {
    const nodeToEdit = document.querySelector(`li[data-id="${currentListID}"] button:first-of-type`);
    nodeToEdit.textContent = newName;
}

function addRenameRemoveMenu(liNode) {
    const rightBtn = document.createElement('button');
    const optionsIcon = new Image(35, 35);
    optionsIcon.src = cogIcon;
    rightBtn.setAttribute('aria-label', 'Edit');
    rightBtn.appendChild(optionsIcon);

    rightBtn.addEventListener('click', () => {
        displayListForm(+rightBtn.parentElement.dataset.id);
    });
    liNode.appendChild(rightBtn);
    //later add a button to remove list
}

function loadClickedList(clickedListNode) {
    if (clickedListNode.classList[0] !== "chosen") {
        setChosenClass(clickedListNode);
        displayTaskList();
    }
}

function setChosenClass(clickedList) {
    const oldChosenList = document.querySelector('.chosen');
    if (oldChosenList)
        oldChosenList.classList.toggle('chosen');

    clickedList.classList.toggle('chosen');
}

function initAddListBtn() {
    const addListBtn = document.createElement('button');
    const plusImg = new Image(35, 35);
    plusImg.src = plusIcon;
    addListBtn.appendChild(plusImg);
    addListBtn.classList.add('addNewList');
    addListBtn.setAttribute('aria-label', 'Add new task list');
    taskGroupsSection.appendChild(addListBtn);

    addListBtn.addEventListener("click", () => displayListForm());
}