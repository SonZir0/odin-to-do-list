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

    getEditableData() {
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
}