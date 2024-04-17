import Task from './task.js'

export default class TaskList {
    constructor(ID, name) {
        // order of editable variables should correspond to html dialog/form structure
        this.name = name;

        // add new input fields above this comment
        this.listID = ID;
        this.taskArr = [];
    }

    getListData() {
        let listData = Object.values(this);
        return listData;
    }

    editListData(listFormInputArr) {
        let listKeysArr = Object.keys(this);
        // continue until listID field. ID and taskArr shouldn't be edited this way
        listFormInputArr.every((inputValue, iterator) => {
            if (listKeysArr[iterator] === "listID")
                return false;
            this[listKeysArr[iterator]] = inputValue;
            return true;
        });
    }

    // task by ID functions
    findTaskByID(ID) {
        return this.taskArr.find((task) => task.taskID === +ID);
    }

    addNewTask(ID, taskFormInputArr) {
        this.taskArr.push(new Task(ID, ...taskFormInputArr));
    }

    getUserDataFromTask(taskID) {
        return this.findTaskByID(taskID).getTaskData();
    }

    editUserDataFromTask(taskID, inputArr) {
        const taskToEdit = this.findTaskByID(taskID);
        taskToEdit.editTaskData(inputArr);
    }

    deleteTaskData(ID) {
        const taskIndex = this.taskArr.findIndex((task) => task.taskID === +ID);
        this.taskArr.splice(taskIndex, 1);
    }
}