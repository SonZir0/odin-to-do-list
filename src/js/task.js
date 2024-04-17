export default class Task {
    constructor(name, description, dueDate, priority, ID) {
        // order of editable variables should correspond to html dialog/form structure
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        // add new form input fields above this comment
        this.taskID = ID;
    }

    getTaskData() {
        let editableData = Object.values(this);
        return editableData;
    }

    editTaskData(taskFormInputArr) {
        let taskKeysArr = Object.keys(this);
        // continue until taskID field. ID shouldn't be edited this way
        taskFormInputArr.every((inputValue, iterator) => {
            if (taskKeysArr[iterator] === "taskID")
                return false

            this[taskKeysArr[iterator]] = inputValue;
            return true;
        });
    }
}