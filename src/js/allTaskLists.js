import TaskList from './taskList.js'

const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: []
}

export { addTaskList, getListEditableData, editTaskListData, getTaskArrFromList, addTaskToTheList}

function addTaskList(listFormInputArr){
    userData.userTaskLists.push(new TaskList(userData.nextListID, ...listFormInputArr));
    return userData.nextListID++;
}

function getListEditableData(listID) {
    const listData = userData.userTaskLists[listID-1].getEditableData();
    return listData;
}

function editTaskListData(listID, listFormInputArr) {
    userData.userTaskLists[listID-1].editEditableFields(listFormInputArr);
}

function getTaskArrFromList(ID) {
    const foundList = userData.userTaskLists.find((taskList) => taskList.listID === +ID);
    return foundList.taskArr;
}

function addTaskToTheList(listID, taskFormInputArr) {
    userData.userTaskLists[listID-1].addNewTask(userData.nextTaskID, taskFormInputArr);
    return userData.nextTaskID++;
}