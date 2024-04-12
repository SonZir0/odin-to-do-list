import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import { displayTaskForm } from './taskDialog';
import { getTaskArrFromList } from './allTaskLists';

const tasksPanel = document.querySelector('.tasks');

export { displayTasksFromList, addCardToPanel}

function displayTasksFromList(listID) {
    clearTaskPanel();
    loadTasksFromList(listID);
    //add new task btn as the first card    
    tasksPanel.firstElementChild.insertBefore(createNewTaskCardBtn(),
        (tasksPanel.firstElementChild.firstElementChild));
}

function loadTasksFromList(listID) {
    const container = document.createElement('div');
    container.classList.add('taskList');
    container.dataset.listId = listID;
    tasksPanel.appendChild(container);
    
    const tasksArr = getTaskArrFromList(listID);
    for (const task of tasksArr) {
        addCardToPanel(listID, task.taskID, task.getEditableTaskData())
    }
    container.appendChild(document.createElement('p'));
}

function addCardToPanel(listID, currentTaskID, taskFormInputArr) {
    const listContainer = document.querySelector(`.tasks [data-list-id="${CSS.escape(listID)}"]`);
    listContainer.appendChild(createTaskCard(currentTaskID, ...taskFormInputArr));
}

function createTaskCard(taskID, name, description, dueDate, priority) {
    const taskCardDiv = document.createElement('div');
    taskCardDiv.classList.add(`taskCard`, `${priority}`);
    taskCardDiv.dataset.taskId = taskID;
    const taskName = document.createElement('p');
    taskName.textContent = name;
    const descr = document.createElement('p');
    descr.textContent = description;
    descr.classList.add('descr');
    const date = document.createElement('p');
    date.textContent = dueDate;
    date.classList.add('date');
    taskCardDiv.append(taskName, descr, date);
    return taskCardDiv;
}

function clearTaskPanel() {
    const allTaskCards = Array.from(tasksPanel.children);
    for (const child of allTaskCards) {
        child.remove();
    }
}

function createNewTaskCardBtn() {
    const newTaskCardBtn = document.createElement('div');
    newTaskCardBtn.classList.add('addNewTask');
    newTaskCardBtn.setAttribute('aria-label', 'Add new task to your list');
    newTaskCardBtn.tabIndex = 0;
    newTaskCardBtn.addEventListener('click', () => displayTaskForm());

    const plusImg = new Image(50, 50);
    plusImg.src = plusIcon;
    newTaskCardBtn.appendChild(plusImg);
    return newTaskCardBtn;
}