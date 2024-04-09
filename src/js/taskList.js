import Task from './task.js'

export default class taskList {
    taskArr = [];
    
    constructor(name, ID) {
        this.name = name;
        this.listID = ID;
    }
}