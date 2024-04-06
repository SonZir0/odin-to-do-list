import Task from './task.js'

export default class taskList {
    tasksArr = [];
    
    constructor(name, ID) {
        this.name = name;
        this.listID = ID;
    }
}