import cogIcon from './../icons/cog-svgrepo-com.svg';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { displayListForm } from "./listDialog";
import {
    displayTasksFromList, displayTasksFromAllLists, deleteTaskListFromDisplay,
    refreshListName
} from './taskPanelDOM';

const taskGroupsSection = document.querySelector('.taskGroups');
const listOfTaskLists = document.querySelector('ul');
const showAllBtn = document.querySelector('.showAll');

export { addListTab, editListTab, deleteListTab, initAddListBtn, initShowAllBtn }

function addListTab(name, currentListID) {
    const newTaskListTab = document.createElement('li');
    const leftBtn = document.createElement('button');

    newTaskListTab.dataset.listId = currentListID;
    leftBtn.textContent = name;
    leftBtn.addEventListener("click", () => { loadClickedList(leftBtn.parentElement); });

    newTaskListTab.appendChild(leftBtn);
    addRenameRemoveMenu(newTaskListTab);
    listOfTaskLists.appendChild(newTaskListTab);
    // later add listener to disable show all if the last list is removed
    showAllBtn.disabled = false;
}

function addRenameRemoveMenu(liNode) {
    const rightBtn = document.createElement('button');
    const optionsIcon = new Image(35, 35);
    optionsIcon.src = cogIcon;
    rightBtn.setAttribute('aria-label', 'Edit');
    rightBtn.appendChild(optionsIcon);

    rightBtn.addEventListener('click', () => {
        displayListForm(+rightBtn.parentElement.dataset.listId);
    });
    liNode.appendChild(rightBtn);
}

function editListTab(currentListID, newName) {
    const listNameBtn = document.querySelector(`li[data-list-id="${currentListID}"] button:first-of-type`);
    listNameBtn.textContent = newName;

    // refresh display in case user edits taskList while it's shown on the right panel
    if (listNameBtn.parentElement.classList.contains('chosen') || showAllBtn.classList.contains('chosen'))
        refreshListName(currentListID, newName);

}

function deleteListTab(listID) {
    const listTab = document.querySelector(`li[data-list-id="${listID}"]`);
    // clear displayed taskList panel if viewed list is deleted
    if (listTab.classList.contains('chosen') || showAllBtn.classList.contains('chosen'))
        deleteTaskListFromDisplay(listID);
    listTab.remove();
}

function loadClickedList(clickedListNode) {
    if (!clickedListNode.classList.contains("chosen")) {
        setChosenClass(clickedListNode);
        displayTasksFromList(clickedListNode.dataset.listId);
    }
}

function loadAllTaskLists() {
    if (!showAllBtn.classList.contains("chosen")) {
        setChosenClass(showAllBtn);
        const listIdArr = Array.from(listOfTaskLists.children).map((list) => list.dataset.listId);
        displayTasksFromAllLists(listIdArr);
    }
}

function setChosenClass(clickedNode) {
    const oldChosenNode = document.querySelector('.chosen');
    if (oldChosenNode)
        oldChosenNode.classList.toggle('chosen');

    clickedNode.classList.toggle('chosen');
}

function initAddListBtn() {
    const addListBtn = document.createElement('button');
    const plusImg = new Image(50, 50);
    plusImg.src = plusIcon;
    addListBtn.appendChild(plusImg);
    addListBtn.classList.add('addNewList');
    addListBtn.setAttribute('aria-label', 'Add new task list');
    taskGroupsSection.appendChild(addListBtn);

    addListBtn.addEventListener("click", () => displayListForm());
}

function initShowAllBtn() {
    showAllBtn.addEventListener('click', loadAllTaskLists);

    var deletionObserver = new MutationObserver(function (records) {
        for (const record of records) {
            if (record.removedNodes.length) {
                if (!listOfTaskLists.children.length)
                    showAllBtn.disabled = true;
            }
        }
    });
    deletionObserver.observe(listOfTaskLists, { childList: true });
}