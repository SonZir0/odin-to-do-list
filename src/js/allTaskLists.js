import TaskList from './taskList.js'

const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: []
}
        //list functions exports
export { addTaskList, getUserDataFromList, editTaskListData, getTaskArrFromList,
        //task functions exports
         addTaskToTheList, getTaskDataFromTaskList, editTaskDataFromTaskList }

function findTaskListByID(ID) {
    return userData.userTaskLists.find((taskList) => taskList.listID === +ID);
}

// lists functions
function addTaskList(listFormInputArr) {
    userData.userTaskLists.push(new TaskList(userData.nextListID, ...listFormInputArr));
    return userData.nextListID++;
}

function getUserDataFromList(listID) {
    const foundList = findTaskListByID(listID);
    return foundList.getEditableListData();
}

function editTaskListData(listID, listFormInputArr) {
    const foundList = findTaskListByID(listID);
    foundList.editEditableFields(listFormInputArr);
}

function getTaskArrFromList(listID) {
    const foundList = findTaskListByID(listID);
    return foundList.getTaskArr();
}

// task functions
function addTaskToTheList(listID, taskFormInputArr) {
    const foundList = findTaskListByID(listID);
    foundList.addNewTask(userData.nextTaskID, taskFormInputArr);
    return userData.nextTaskID++;
}

function getTaskDataFromTaskList(listID, taskID) {
    const foundList = findTaskListByID(listID);
    return foundList.getUserDataFromTask(taskID);
}

function editTaskDataFromTaskList(listID, taskID, inputArr) {
    const foundList = findTaskListByID(listID);
    foundList.editUserDataFromTask(taskID, inputArr);
}