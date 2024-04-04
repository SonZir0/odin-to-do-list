import 'normalize.css'
import './../css/base.css'

const newListDialog = document.querySelector(".newList");
const newTaskDialog = document.querySelector(".newTask");

newListDialog.showModal();
newTaskDialog.showModal();

newListDialog.addEventListener("close", (event) => {
    console.log(newListDialog.returnValue);
});

newTaskDialog.addEventListener("close", (event) => {
    console.log(newTaskDialog.returnValue);
});