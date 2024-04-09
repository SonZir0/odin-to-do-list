import TaskList from './taskList.js'

const userData = {
    nextListID: 1,
    nextTaskID: 1,
    userTaskLists: []
}

export function addTaskList(name){
    userData.userTaskLists.push(new TaskList(name, userData.nextListID));
    return userData.nextListID++;
}

export function findTaskList(ID) {
    const found = userData.userTaskLists.find((taskList) => taskList.listID === +ID);
    return found;
}
