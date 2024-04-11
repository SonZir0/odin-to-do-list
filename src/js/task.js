export default class Task {
    constructor(ID, name, description, dueDate, priority) {
        // order of editable variables should correspond to html dialog/form structure
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        // add new input fields above this comment
        this.nonEditableFieldsCount = 2; // if new nonEditableFields are added - adjust
        this.taskID = ID;
    }

    getEditableTaskData() {
        let editableData = Object.values(this);
        editableData = editableData.slice(0, editableData.length - this.nonEditableFieldsCount);
        return editableData;
    }

    editEditableFields(taskFormInputArr) {
        let editableFields = Object.keys(this);
        editableFields = editableFields.slice(0, editableFields.length - this.nonEditableFieldsCount);

        for (const key of editableFields) {
            editableFields.forEach((key, iterator) => {
                this[key] = taskFormInputArr[iterator];
            });
        }
    }
}