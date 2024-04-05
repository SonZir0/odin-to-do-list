import TaskList from './taskList.js'

export const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: [],

    addTaskList(name){
        this.userTaskLists.push(new TaskList(name, this.nextListId));
        this.nextListID++;
    }
}