import Task from './task.js'

export default class TaskList {
    constructor(ID, name) {
        // order of editable variables should correspond to html dialog/form structure
        this.name = name;

        // add new input fields above this comment
        this.nonEditableFieldsCount = 3; // if new nonEditableFields are added - adjust
        this.listID = ID;
        this.taskArr = [];
    }

    findTaskByID(ID) {
        return this.taskArr.find((task) => task.taskID === +ID);
    }

    getEditableListData() {
        let editableData = Object.values(this);
        editableData = editableData.slice(0, editableData.length - this.nonEditableFieldsCount);
        return editableData;
    }

    editEditableFields(listFormInputArr) {
        let editableFields = Object.keys(this);
        editableFields = editableFields.slice(0, editableFields.length - this.nonEditableFieldsCount);

        for (const key of editableFields) {
            editableFields.forEach((key, iterator) => {
                this[key] = listFormInputArr[iterator];
            });
        }
    }

    getTaskArr() {
        return this.taskArr;
    }

    addNewTask(ID, taskFormInputArr) {
        this.taskArr.push(new Task(ID, ...taskFormInputArr));
    }

    getUserDataFromTask(taskID) {
        return this.findTaskByID(taskID).getEditableTaskData(taskID);
    }

    editUserDataFromTask(taskID, inputArr) {
        const taskToEdit = this.findTaskByID(taskID);
        taskToEdit.editEditableFields(inputArr);
    }

    deleteTaskData(ID) {
        const taskIndex = this.taskArr.findIndex((task) => task.taskID === +ID);
        this.taskArr.splice(taskIndex, 1);
    }
}