import TaskList from './taskList.js'

const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: []
}

export { addTaskList, getListEditableData, editTaskListData, findTaskList, addTaskToTheList}

function addTaskList(listFormInputArr){
    userData.userTaskLists.push(new TaskList(...listFormInputArr, userData.nextListID));
    return userData.nextListID++;
}

function getListEditableData(listID) {
    const listData = userData.userTaskLists[listID-1].getEditableData();
    return listData;
}

function editTaskListData(listID, listFormInputArr) {
    userData.userTaskLists[listID-1].editEditableFields(listFormInputArr);
}

function findTaskList(ID) {
    const found = userData.userTaskLists.find((taskList) => taskList.listID === +ID);
    return found;
}

function addTaskToTheList(taskFormInputArr) {
    tastTemp.addNewTask(...taskFormInputArr, userData.nextTaskID);
    return userData.nextTaskID++;
}