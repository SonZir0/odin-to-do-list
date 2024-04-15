import './../css/rightPanel.css';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { displayTaskForm } from './taskDialog';
import { getTaskArrFromList } from './allTaskLists';

const taskDisplay = document.querySelector('.taskDisplay');

export { displayTasksFromList, addCardToPanel, editTaskCardOnDisplay }

function displayTasksFromList(listID) {
    clearTaskPanel();
    loadList(listID);
    //add new task btn as the first card in allTasks div
    const allTasksDivInList = document.querySelector('.taskList > div');
    allTasksDivInList.prepend(createNewTaskCardBtn(listID));
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
}

function addCardToPanel(listID, currentTaskID, taskFormInputArr) {
    const tasksContainer = document.querySelector(`.taskDisplay [data-list-id="${CSS.escape(listID)}"] > div`);
    tasksContainer.appendChild(createTaskCard(currentTaskID, listID, ...taskFormInputArr));
}

function createTaskCard(taskID, listID, name, description, dueDate, priority) {
    const taskCardDiv = document.createElement('div');
    taskCardDiv.classList.add(`taskCard`, `${priority}`);
    taskCardDiv.dataset.taskId = taskID;
    taskCardDiv.tabIndex = 0;
    taskCardDiv.addEventListener('click', () => displayTaskForm(taskID, listID));
    taskCardDiv.addEventListener('keyup', (event) => {
        if (event.key === "Enter")
            taskCardDiv.dispatchEvent(new Event('click'));
    });

    const taskName = document.createElement('p');
    taskName.textContent = name;
    taskName.classList.add('name');

    const divider1 = document.createElement('div');
    divider1.classList.add('divider');

    const descr = document.createElement('p');
    descr.textContent = description;
    descr.classList.add('descr');

    const divider2 = document.createElement('div');
    divider2.classList.add('divider');

    const date = document.createElement('p');
    date.textContent = dueDate;
    date.classList.add('date');

    taskCardDiv.append(taskName, divider1, descr, divider2, date);
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

function clearTaskPanel() {
    const allTaskCards = Array.from(taskDisplay.children);
    for (const child of allTaskCards) {
        child.remove();
    }
}

function createNewTaskCardBtn(listID) {
    const newTaskCardBtn = document.createElement('div');
    newTaskCardBtn.classList.add('addNewTask');
    newTaskCardBtn.setAttribute('aria-label', 'Add new task to your list');
    newTaskCardBtn.tabIndex = 0;
    newTaskCardBtn.addEventListener('click', () => displayTaskForm(false, listID));
    newTaskCardBtn.addEventListener('keyup', (event) => {
        if (event.key === "Enter")
            newTaskCardBtn.dispatchEvent(new Event('click'));
    });

    const plusImg = new Image(100, 100);
    plusImg.src = plusIcon;
    newTaskCardBtn.appendChild(plusImg);
    return newTaskCardBtn;
}