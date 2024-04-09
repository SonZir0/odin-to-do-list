export default class Task {
    constructor(name, description, dueDate, priority, ID) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskID = ID;
    }
}