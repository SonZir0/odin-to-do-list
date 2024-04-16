import './../css/rightPanel.css';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { displayTaskForm } from './taskDialog';
import { getTaskArrFromList } from './allTaskLists';

const taskDisplay = document.querySelector('.taskDisplay');

export {
    displayTasksFromList, displayTasksFromAllLists, addCardToPanel, editTaskCardOnDisplay,
    deleteTaskCardFromDisplay, deleteTaskListFromDisplay, refreshListName
}

// this function is to load tasks from one clicked list
function displayTasksFromList(listID) {
    clearTaskPanel();
    loadList(listID);
    //add new task btn as the first card in allTasks div
    const allTasksDivInList = document.querySelector('.taskList > div');
    allTasksDivInList.prepend(createNewTaskCardBtn(listID));
}

function displayTasksFromAllLists(listIdArr) {
    clearTaskPanel();
    listIdArr.forEach((listID, index) => {
        const tasksArr = getTaskArrFromList(listID);
        if (tasksArr.length) {
            loadList(listID);
            if (index + 1 < listIdArr.length)
                taskDisplay.append(createDividerDiv());
        }
    });
}

function loadList(listID) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('taskList');
    listContainer.dataset.listId = listID;

    const listNameBtnElem = document.querySelector(`li[data-list-id="${listID}"] button:first-of-type`);
    const listName = document.createElement('h3');
    listName.textContent = listNameBtnElem.textContent + ":";

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('allTasks');

    listContainer.append(listName, tasksContainer);
    taskDisplay.appendChild(listContainer);

    const tasksArr = getTaskArrFromList(listID);
    for (const task of tasksArr) {
        addCardToPanel(listID, task.taskID, task.getEditableTaskData())
    }
    return listContainer;
}

function addCardToPanel(listID, currentTaskID, taskFormInputArr) {
    const tasksContainer = document.querySelector(`.taskDisplay [data-list-id="${CSS.escape(listID)}"] > div`);
    tasksContainer.appendChild(createTaskCard(currentTaskID, listID, ...taskFormInputArr));
}

function createTaskCard(taskID, listID, name, description, dueDate, priority) {
    const taskCardDiv = document.createElement('button');
    taskCardDiv.classList.add(`taskCard`, `${priority}`);
    taskCardDiv.dataset.taskId = taskID;
    taskCardDiv.addEventListener('click', () => displayTaskForm(taskID, listID));

    const taskName = document.createElement('p');
    taskName.textContent = name;
    taskName.classList.add('name');

    const descr = document.createElement('p');
    descr.textContent = description;
    descr.classList.add('descr');

    const date = document.createElement('p');
    date.textContent = dueDate;
    date.classList.add('date');

    taskCardDiv.append(taskName, createDividerDiv(), descr, createDividerDiv(), date);
    return taskCardDiv;
}

function editTaskCardOnDisplay(listID, taskCardID, name, description, dueDate, priority) {
    const cardToEdit = document.querySelector(`.taskList[data-list-id="${listID}"] 
                                                .taskCard[data-task-id="${taskCardID}"]`);
    cardToEdit.className = `taskCard ${priority}`;

    const cardTextNodes = Array.from(cardToEdit.querySelectorAll(`:scope > p`));
    cardTextNodes[0].textContent = name;
    cardTextNodes[1].textContent = description;
    cardTextNodes[2].textContent = dueDate;
}

function deleteTaskCardFromDisplay(listID, taskID) {
    const tasksInListContainer = document.querySelector(`.taskList[data-list-id="${listID}"] .allTasks`);
    const cardToDelete = tasksInListContainer.querySelector(`:scope .taskCard[data-task-id="${taskID}"]`);
    /*  if the card to be deleted in showAll display (no newTaskCard button) is the last one,
        delete empty list from display  */
    if (tasksInListContainer.children.length === 1) 
        deleteTaskListFromDisplay(listID);
    else cardToDelete.remove(); // otherwise just one card
}

function deleteTaskListFromDisplay(listID) {
    const taskListToDelete = document.querySelector(`.taskList[data-list-id="${listID}"]`);
    /*  task lists should display either alone, or through showAll btn, with dividers in between
        if there're siblings, then it's showAll with dividers  */
    if (taskListToDelete) {     // check if the list is present on display (empty lists ignored by showAll)
        if (taskListToDelete.nextSibling)
            taskListToDelete.nextSibling.remove(); // delete divider
        taskListToDelete.remove();
    }
}

function clearTaskPanel() {
    const allTaskCards = Array.from(taskDisplay.children);
    for (const child of allTaskCards) {
        child.remove();
    }
}

function refreshListName(listID, newName) {
    const taskListName = document.querySelector(`.taskList[data-list-id="${listID}"] > h3`);
    if (taskListName)    // in case showAll doesn't show empty taskList
        taskListName.textContent = newName;
}

function createDividerDiv() {
    const divider = document.createElement('div');
    divider.classList.add('divider');
    return divider;
}

function createNewTaskCardBtn(listID) {
    const newTaskCardBtn = document.createElement('button');
    newTaskCardBtn.classList.add('addNewTask');
    newTaskCardBtn.setAttribute('aria-label', 'Add new task to your list');
    newTaskCardBtn.addEventListener('click', () => displayTaskForm(false, listID));

    const plusImg = new Image(100, 100);
    plusImg.src = plusIcon;
    newTaskCardBtn.appendChild(plusImg);
    return newTaskCardBtn;
}