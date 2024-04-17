import TaskList from './taskList.js'
import { addListTab } from './listsPanelDOM.js';
import defaultData from './../json/defaultTaskList.json';

let storageIsAvailable = false;
const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: []
}
//list functions exports
export {
    addTaskList, getUserDataFromList, editTaskListData, getTaskArrFromList, deleteTaskListData,
    //task functions exports
    addTaskToTheList, getTaskDataFromTaskList, editTaskDataFromTaskList, deleteTaskFromTaskList,
    //storage functions
    checkStorageAndLoadData
}

// lists functions
function findTaskListByID(ID) {
    return userData.userTaskLists.find((taskList) => taskList.listID === +ID);
}

function addTaskList(listFormInputArr) {
    const newListID = userData.nextListID++;
    userData.userTaskLists.push(new TaskList(...listFormInputArr, newListID));

    saveUserDataToLocalStorage();
    return newListID;
}

function editTaskListData(listID, listFormInputArr) {
    const foundList = findTaskListByID(listID);
    foundList.editListData(listFormInputArr);

    saveUserDataToLocalStorage();
}

function deleteTaskListData(ID) {
    const listIndex = userData.userTaskLists.findIndex((taskList) => taskList.listID === +ID);
    userData.userTaskLists.splice(listIndex, 1);

    saveUserDataToLocalStorage();
}

function getUserDataFromList(listID) {
    const foundList = findTaskListByID(listID);
    return foundList.getListData();
}

function getTaskArrFromList(listID) {
    const foundListDataArr = getUserDataFromList(listID);
    return foundListDataArr[foundListDataArr.length - 1];   // taskArr is the last property in TaskList
}

// task functions
function addTaskToTheList(listID, taskFormInputArr) {
    const foundList = findTaskListByID(listID);
    const newTaskID = userData.nextTaskID++
    foundList.addNewTask(taskFormInputArr, newTaskID);

    saveUserDataToLocalStorage();
    return newTaskID;
}

function getTaskDataFromTaskList(listID, taskID) {
    const foundList = findTaskListByID(listID);
    return foundList.getUserDataFromTask(taskID);
}

function editTaskDataFromTaskList(listID, taskID, inputArr) {
    const foundList = findTaskListByID(listID);
    foundList.editUserDataFromTask(taskID, inputArr);

    saveUserDataToLocalStorage();
}

function deleteTaskFromTaskList(listID, taskID) {
    const foundList = findTaskListByID(listID);
    foundList.deleteTaskData(taskID);

    saveUserDataToLocalStorage();
}

function checkStorageAndLoadData() {
    storageIsAvailable = storageAvailable('localStorage');
    if (storageIsAvailable)
        loadUserDataFromLocalStorage();
    else alert("Local storage is not available, your data won't be saved!");
}

function loadUserDataFromLocalStorage() {
    let savedUserData = localStorage.getItem('storedToDoData');
    savedUserData = JSON.parse(savedUserData);

    if (!savedUserData)
        savedUserData = defaultData;

    // assign userData fields (except listArr)
    const userDataKeysArr = Object.keys(userData);
    userDataKeysArr.every((key, iterator) => {
        if (key === "userTaskLists")
            return false;
        userData[key] = savedUserData[key];
        return true;
    });

    // create TaskLists
    savedUserData.userTaskLists.forEach((taskList, listIterator) => {
        // all the input fields + ID. TaskArr field is redundant as a parametr
        const taskListData = Object.values(taskList);
        userData.userTaskLists.push(new TaskList(...taskListData));
        addListTab(...taskListData);

        // create tasks
        taskList.taskArr.forEach((task, taskIterator) => {
            // all the input fields + ID.
            userData.userTaskLists[listIterator].addNewTask(Object.values(task));
        });
    });
}

function saveUserDataToLocalStorage() {
    if (storageIsAvailable)
        localStorage.storedToDoData = JSON.stringify(userData);
}

/*  test storage code is from the mdn storage page
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}